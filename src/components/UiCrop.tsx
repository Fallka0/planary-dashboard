interface UiCropProps {
  className: string;
  /** Placeholder label, shown until the real crop is supplied. */
  title: string;
  note: string;
  src?: string;
  alt?: string;
}

/** A crop of a casino screenshot, or its labelled placeholder until one is supplied. */
export function UiCrop({ className, title, note, src, alt = '' }: UiCropProps) {
  return (
    <div className={`crop ${className}`}>
      {src ? (
        <img className="crop-img" src={src} alt={alt} decoding="async" />
      ) : (
        <>
          <b>{title}</b>
          <span>{note}</span>
        </>
      )}
    </div>
  );
}
