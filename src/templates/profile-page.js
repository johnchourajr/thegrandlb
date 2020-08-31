import React from "react";
import { graphql, navigate } from "gatsby";

import { HTMLContent } from "../components/Content";
import Layout from "../components/core/Layout";
import PageHeader from "../components/PageHeader";

import {
  IdentityModal,
  useIdentityContext
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css"; // delete if you want to bring your own CSS

const Login = ({ identity, dialog, setDialog, name, email }) => {
  return (
    <div className="xs-flex xs-flex-column xs-flex-align-center">
      {identity && identity.isLoggedIn ? (
        <React.Fragment>
          <p>{email}</p>
          <button
            className="button button--small button--secondary xs-mt3"
            style={{ maxWidth: 400, background: "orangered" }}
            onClick={() => setDialog(true)}
          >
            LOG OUT
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button
            className="button button--small button--secondary xs-mt3"
            style={{ maxWidth: 400, background: "darkgreen" }}
            onClick={() => setDialog(true)}
          >
            LOG IN
          </button>
        </React.Fragment>
      )}

      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate("/profile")}
        onSignup={user => navigate("/profile")}
      />
    </div>
  );
};

const ProfilePage = ({ data, status }) => {
  const { frontmatter, html } = data.markdownRemark;
  const identity = useIdentityContext();
  const [dialog, setDialog] = React.useState(false);

  const headline =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    `Log In`;

  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.full_name) ||
    "User";
  const email = (identity && identity.user && identity.user.email) || "Email";
  const avatar_url =
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.avatar_url;

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={`Hello,\n${headline}`} />
      <section className="basic-page section">
        <div className="wrapper clearfix">
          <div className="xs-col-12 md-offset-2 md-col-8">
            <Login
              identity={identity}
              dialog={dialog}
              setDialog={setDialog}
              name={name}
              email={email}
            />
            <HTMLContent className="content" content={html} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;

export const basicPageQuery = graphql`
  query ProfilePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
  }
`;
