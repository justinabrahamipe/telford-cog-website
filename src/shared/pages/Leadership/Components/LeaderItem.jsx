import React from "react";
import { Button, Card, Image, Icon } from "semantic-ui-react";

const LeaderItem = ({
  image,
  name,
  designation,
  decription,
  socialMedia,
  fb,
  wa,
}) => (
  <Card.Group>
    <Card>
      <Card.Content>
        {image && (
          <>
            <Image src={image} />
            <br />
            <br />
          </>
        )}
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{designation}</Card.Meta>
        <Card.Description>{decription}</Card.Description>
      </Card.Content>
      {socialMedia ? (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="grey">
              <a href={fb}>
                <Icon name="facebook" />
              </a>
            </Button>

            <Button basic color="grey">
              <a href={wa}>
                <Icon name="whatsapp" />
              </a>
            </Button>
          </div>
        </Card.Content>
      ) : (
        <></>
      )}
    </Card>
  </Card.Group>
);

export default LeaderItem;
