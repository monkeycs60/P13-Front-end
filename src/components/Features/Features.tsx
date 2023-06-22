import { FeatureItem } from './FeatureItem';
import IconChat from '../../assets/icon-chat.png';
import IconMoney from '../../assets/icon-money.png';
import IconSecurity from '../../assets/icon-security.png';


export const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        imgSrc={IconChat}
        imgAlt="Chat Icon"
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem
        imgSrc={IconMoney}
        imgAlt="Money Icon"
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem
        imgSrc={IconSecurity}
        imgAlt="Security Icon"
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  );
};
