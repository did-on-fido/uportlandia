import React from "react";
import styled from "styled-components";
import shortId from "shortid";

import * as theme from "../shared/theme";
import { LinkButton } from "../shared/elements";
import Services from "../shared/Services";
import { medium } from "../shared/grid";
import Tooltip from "./Tooltip";
import shareClaimIcon from "../../images/circle-arrow-up.svg";
import receiveClaimIcon from "../../images/circle-arrow-down.svg";

class HomeCard extends React.Component {
  constructor() {
    super();
    this.tid = shortId.generate();
  }
  render() {
    const {
      name,
      icon,
      superText,
      description,
      shareClaims,
      receiveClaims,
      url,
      onSubmit
    } = this.props;

    return (<Card>
      <Content>
        <Padded>
          <Header>
            <Header.Icon src={icon} alt={name} />
            <Header.Sup>{superText}</Header.Sup>
            <Header.Name>{name}</Header.Name>
          </Header>
          <DescriptionRow>
            <Description>{description}</Description>
            <LinkButton to={url}>Get Started</LinkButton>
          </DescriptionRow>
        </Padded>
        <ClaimLists>
          <ShareClaims>
            <ShareClaimsIcon />
            <Label>
              <span>Claims to</span>{" "}
              <TooltipTrigger data-tip data-for={`share-${this.tid}`}>Share</TooltipTrigger>
              <Tooltip id={`share-${this.tid}`} heading="Claims to Share"
                description="Information requested by this issuer. It can be data that you issue yourself (self-verified claims) or has been issued by a 3rd party and stored in your uPort app.">
              </Tooltip>
            </Label>
            <ul>
              {shareClaims && shareClaims.length
                ? shareClaims.map(claim => {
                    const tid = shortId.generate();
                    return (<Claim key={claim.name}>
                      <Claim.Name>{claim.name}</Claim.Name>
                      <Claim.Entity>
                        Issued by <Claim.Entity.Name>{claim.issuedBy[0].entity}</Claim.Entity.Name>
                      </Claim.Entity>
                    </Claim>);
                  })
                : <Claim>
                    <Claim.Entity>No claims requested</Claim.Entity>
                  </Claim>}
            </ul>
          </ShareClaims>
          <ReceiveClaims>
            <ReceiveClaimsIcon />
            <Label>
              <span>Claims you'll</span>{" "}
              <TooltipTrigger data-tip data-for={`receive-${this.tid}`}>Receive</TooltipTrigger>
              <Tooltip id={`receive-${this.tid}`} heading="Claims you'll Receive"
                description="Verified information that you’ll receive from this issuer. It will be stored in your uPort app and available to share with other services that honor them.">
              </Tooltip>
            </Label>
            <ul>
              {(receiveClaims || []).map(claim => {
                return (<Claim key={claim.name}>
                  <Claim.Name>{claim.name}</Claim.Name>
                  {claim.honoredBy
                    ? <Claim.Entity>
                      Honored by <Claim.Entity.Name>{claim.honoredBy[0].entity}</Claim.Entity.Name>
                      {claim.honoredBy.length > 1
                        ? <React.Fragment>
                            {" ... "}
                            <TooltipTrigger data-tip data-for={`${claim.name}-${this.tid}`}>
                              {` view all(${claim.honoredBy.length})`}
                            </TooltipTrigger>
                            <Tooltip id={`${claim.name}-${this.tid}`} heading={claim.name}
                              description="Claim you'll receive from this issuer is honored by">
                              <Services compact data={claim.honoredBy} />
                            </Tooltip>
                          </React.Fragment>
                        : null}
                    </Claim.Entity>
                    : <Claim.Entity>
                      No other services honor this claim yet
                    </Claim.Entity>}
                  </Claim>);
                })}
            </ul>
          </ReceiveClaims>
        </ClaimLists>
      </Content>
    </Card>)
  }
}

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 2px 0px 1px rgba(188, 188, 188, 0.15);
  font-size: 0.875rem;
  line-height: 1.25;
  margin: 50px auto 0;
  max-width: 800px;
`;
const Content = styled.div`
  background: ${theme.main.bg};
  border-radius: 8px;
  position: relative;
  ul {
    list-style-type: none;
    margin: 10px 0 0;
    padding: 0;
  }
  ${LinkButton} {
    display: block;
    height: 2.5rem;
  }
`;
const Padded = styled.div`
  padding: 30px;
`;
const AltColorBG = styled.div`
  background: ${theme.colors.cardAltBg};
  border-radius: 0 8px 8px 0;
  display: none;
  ${medium("display: block;")}
`;
const Header = styled.div`;
  line-height: 1.5;
  text-align: center;
  ${medium(`
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 11fr 24fr;
    grid-gap: 5px 15px;
    line-height: 1;
    text-align: left;
  `)}
`;
Header.Icon = styled.img`
  border-radius: 15px;
  box-shadow: inset 0 0 2px rgba(114, 114, 114, 0.3);
  grid-area: 1 / 1 / 3 / 2;
  max-height: 100%;
  max-width: 100%;
`;
Header.Sup = styled.p`
  align-self: flex-end;
  color: ${theme.colors.primary};
  font-size: 0.6875rem;
  font-weight: 700;
  grid-area: 1 / 2 / 2 / 3;
  text-transform: uppercase;
`;
Header.Name = styled.h2`
  align-self: center;
  font-size: 1.5rem;
  font-weight: bold;
  grid-area: 2 / 2 / 3 / 3;
`;
const DescriptionRow = styled.div`
  align-items: center;
  margin-top: 15px;
  text-align: center;
  ${medium(`
    display: grid;
    grid-template-columns: 4fr 1fr;
    text-align: left;
  `)}
`;
const Description = styled.p`
  margin: 20px 0;
  ${medium("margin: 0 20px 0 0;")}
`;
const ClaimLists = styled.div`
  background: ${theme.colors.cardAltBg};
  border-radius: 0 0 8px 8px;
  padding: 30px;
  ${medium(`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `)}
`;
const ShareClaimsIcon = styled.div`
  background: url(${shareClaimIcon}) center no-repeat;
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  width: 20px;
`;
const ReceiveClaimsIcon = styled(ShareClaimsIcon)`
  background-image: url(${receiveClaimIcon});
`;
const Label = styled.div`
  color: ${theme.colors.heavyText};
  display: inline-block;
  position: relative;
  top: -5px;
  & > a,
  & > span {
    font-size: 0.75rem;
    text-transform: uppercase;
  }
`;
const ShareClaims = styled.div`
  margin-bottom: 30px;
  ${medium("margin: 0;")}
`;
const ReceiveClaims = styled(ShareClaims)``;
const Claim = styled.li`
  // display: flex;
  padding-left: 30px;
  & + & {
    margin-top: 10px;
  }
`;
Claim.Name = styled.div`
  margin-right: 5px;
`;
Claim.Type = styled.div`
  color: ${theme.colors.mutedText};
`;
Claim.Entity = styled.div`
  color: ${theme.colors.mutedText};
  font-size: 0.75rem;
`;
Claim.Entity.Name = styled.span`
  color: ${theme.colors.mutedText2};
  font-weight: 500;
`;
const TooltipTrigger = styled.a`
  border-bottom: dotted 1px ${theme.colors.primary};
  color: inherit;
  cursor: default;
  text-decoration: none;
`;

export default HomeCard;
