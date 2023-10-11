import { useContext } from "react"
import { ScormContext } from "../contexts/Scorm/ScormContext"

const useScorm = () => useContext(ScormContext)

export default useScorm