interface UiCropProps {
  className: string;
  /** Placeholder label, shown until the real crop is supplied. */
  title: string;
  note: string;
  src?: string;
  alt?: string;
}

/** A slot for a real crop of a casino screenshot. */
export function UiCrop({ className, title, note, src, alt = '' }: UiCropProps) {
  return (
    <div className={`crop ${className}`}>
      {src ? (
        <img className="crop-img" src={src} alt={alt} loading="lazy" decoding="async" />
      ) : (
        <>
          <b>{title}</b>
          <span>{note}</span>
        </>
      )}
    </div>
  );
}
