import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Home, Login, Register, SinglePost, Profile } from "./Pages";
import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./routes";
import { CustomModal } from "./components";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const [autoLogoutModalOpen, setAutoLogoutModalOpen] = useState(false);
  return (
    <AuthProvider onAutoLogout={() => setAutoLogoutModalOpen(true)}>
      <CustomModal
        header="You've Been Logged Out"
        content='You session has expired and you have been logged out. Please log in again.'
        isOpen={autoLogoutModalOpen}
        onClose={() => setAutoLogoutModalOpen(false)}
      />
      <Router>
        <Container>
          <Route exact path='/' component={Home} />
          <Route exact path='/user/:username' component={Profile} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
