import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
//   interface RentnEmailProps {
    // email?: string;
//   }
  
  const baseUrl = process.env.LOGO_LINK

  
  export const RentnResetPasswordProfile = () => (
    <Html>
      <Head />
      <Preview>Alert, you changed your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${baseUrl}/static/slack-logo.png`}
              width="120"
              height="36"
              alt="Rentn"
            />
          </Section>
          <Heading style={h1}>Confirm Password Change</Heading>
          <Text style={heroText}>
            Dear user, <br />
            {/* &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
            You have successfully changed your password to your rentn account.
            Please endeavour to sign in with your new login details
          </Text>
  
          {/* <Section style={codeBox}>
            <Text style={confirmationCodeText}>{rentnOtp}</Text>
          </Section> */}
  
          <Text style={text}>
            If you didn't request a password change on your account, please contact us.
            can safely ignore it.
          </Text>
  
          <Section>
            <Row style={footerLogos}>
              <Column style={{ width: '66%' }}>
                <Img
                  src={baseUrl}
                  width="120"
                  height="36"
                  alt="Rentn"
                />
              </Column>
              <Column>
                <Row>
                  <Column>
                    <Link href="/">
                      <Img
                        src={baseUrl}
                        width="32"
                        height="32"
                        alt="Rentn"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={baseUrl}
                        width="32"
                        height="32"
                        alt="Rentn"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={baseUrl}
                        width="32"
                        height="32"
                        alt="Rentn"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>
  
          <Section>
            <Link
              style={footerLink}
              href="https://rentn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Our blog
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://rentn.com/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Policies
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://rentn.com/help"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help center
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://rentn.com/community"
              target="_blank"
              rel="noopener noreferrer"
              data-auth="NotApplicable"
              data-linkindex="6"
            >
              Rentn Community
            </Link>
            <Text style={footerText}>
              ©2023 Rentn. <br />
              Warri, Delta State Nigeria <br />
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default RentnResetPasswordProfile;
  
  const footerText = {
    fontSize: '12px',
    color: '#b7b7b7',
    lineHeight: '15px',
    textAlign: 'left' as const,
    marginBottom: '50px',
  };
  
  const footerLink = {
    color: '#b7b7b7',
    textDecoration: 'underline',
  };
  
  const footerLogos = {
    marginBottom: '32px',
    paddingLeft: '8px',
    paddingRight: '8px',
    width: '100%',
  };
  
  const socialMediaIcon = {
    display: 'inline',
    marginLeft: '32px',
  };
  
  const main = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };
  
  const container = {
    maxWidth: '600px',
    margin: '0 auto',
  };
  
  const logoContainer = {
    marginTop: '32px',
  };
  
  const h1 = {
    color: '#1d1c1d',
    fontSize: '36px',
    fontWeight: '700',
    margin: '30px 0',
    padding: '0',
    lineHeight: '42px',
  };
  
  const heroText = {
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '30px',
  };
  
  const codeBox = {
    background: 'rgb(245, 244, 245)',
    borderRadius: '4px',
    marginRight: '50px',
    marginBottom: '30px',
    padding: '43px 23px',
  };
  
  const confirmationCodeText = {
    fontSize: '30px',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
  };
  
  const text = {
    color: '#000',
    fontSize: '14px',
    lineHeight: '24px',
  };
  