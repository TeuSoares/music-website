interface BulletPointProps {
  title: string
  description?: string
}

const BulletPoint = ({ title, description }: BulletPointProps) => {
  return (
    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[#BC2627]" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

export default BulletPoint
