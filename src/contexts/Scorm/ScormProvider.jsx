import { SCORM } from "pipwerks-scorm-api-wrapper";
import { ScormContext } from "./ScormContext";


export default function ScormProvider({ children }) {
    const scorm = {
      init() {
        SCORM.init();
        SCORM.set("cmi.core.score.min", "0");
        SCORM.set("cmi.core.score.max", "100");
        SCORM.set("cmi.core.score.raw", "0");
        SCORM.set("cmi.core.lesson_status", 'failed');
      },
      getLearnerName() {
        return SCORM.get("cmi.core.student_name")
      },
      getScore() {
        return SCORM.get("cmi.core.score.raw")
      },
      setScore(percentual) {
        SCORM.set("cmi.core.score.raw", percentual.toString());
        SCORM.set("cmi.core.lesson_status", (parseInt(percentual) >= 80 ? "passed" : "failed"));
      },
      getStatus() {
        return SCORM.get("cmi.core.lesson_status")
      },
      finish() {
        console.log("you have finished!");
        SCORM.save();
      },
    };
  
    window.onunload = window.onbeforeunload = () => {
      scorm.finish()
    }
  
    return (
        <ScormContext.Provider value={{ scorm }}>
            { children }
        </ScormContext.Provider>
    )
  }