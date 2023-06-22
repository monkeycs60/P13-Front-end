type FeatureItemProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
};

export const FeatureItem = ({
  imgSrc,
  imgAlt,
  title,
  description,
}: FeatureItemProps) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};
