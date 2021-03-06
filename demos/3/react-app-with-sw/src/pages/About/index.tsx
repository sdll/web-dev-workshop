import React from 'react';
import { Card, CardBody, CardDeck, CardImg, CardText } from 'reactstrap';
import { ImageLoader } from '../../components/ImageLoader';
import './index.css';
interface ThematicCardProps {
  theme: string;
  text: string;
}

const ThematicCard: React.FC<ThematicCardProps> = ({ text, theme }) => {
  const [isLoaded, updateStatus] = React.useState(false);
  const loader = <ImageLoader minHeight={`200px`} minWidth={`200px`} />;
  return (
    <Card body className="mx-auto rounded-lg">
      <CardBody className="text-left font-weight-bold">
        <CardText>{text}</CardText>
      </CardBody>
      {isLoaded ? null : loader}
      <CardImg
        className="rounded landing-image"
        style={{
          objectFit: 'cover',
          display: isLoaded ? 'block' : 'none',
        }}
        src={`https://source.unsplash.com/random/50×50/?${theme}`}
        srcSet={`https://source.unsplash.com/random/100×100/?${theme} 100w, 
                 https://source.unsplash.com/random/200×200/?${theme} 200w, 
                 https://source.unsplash.com/random/400x400/?${theme} 400w`}
        sizes="(max-width: 767.98px) 100px,
               (max-width: 991.98px) 200px,
               400px"
        onLoad={() => updateStatus(true)}
        alt={theme}
      ></CardImg>
    </Card>
  );
};
const About = () => {
  return (
    <CardDeck className="px-4">
      <ThematicCard
        theme={'optimism'}
        text={
          'Moodie helps you feel better by finding gifs that match your emotions.'
        }
      />
      <ThematicCard theme={'joy'} text={'Save favorites and enjoy!'} />
      <ThematicCard
        theme={'adventure'}
        text={'Start exploring experiences in the search bar above.'}
      />
    </CardDeck>
  );
};
export default About;
