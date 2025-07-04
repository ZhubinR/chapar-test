import { defaultConfig } from "next/dist/server/config-shared"

interface SkillBadgeProps  {
  skill: string
  onRemove: (skill: string) => void
}

const SkillBadge:React.FC<SkillBadgeProps> =({ skill, onRemove }) => {
  return (
    <span className="bg-gray-200 px-2 py-1 rounded flex gap-1.5 items-center">
      {skill}
      <button
        onClick={() => onRemove(skill)}
        className="ml-2 text-red-500 font-bold"
        type="button"
      >
        ×
      </button>
    </span>
  )
}

export default SkillBadge
