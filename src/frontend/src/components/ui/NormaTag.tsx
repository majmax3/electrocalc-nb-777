interface NormaTagProps {
  reference: string;
}

export function NormaTag({ reference }: NormaTagProps) {
  return (
    <span
      data-ocid="norma.tag"
      className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-secondary/60 border border-border rounded-sm px-1.5 py-0.5 tracking-wide"
    >
      <span>📋</span>
      {reference}
    </span>
  );
}
