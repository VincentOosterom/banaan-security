import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form>
          <label htmlFor="username">
              <input type="text" placeholder="Uw Gebruikersnaam"  id="username" />
          </label>
          <label htmlFor="password">
              <input type="password" placeholder="Uw Wachtwoord" id="password"/>
          </label>
          <label htmlFor="comfirm-password">
              <input type="password" placeholder="Bevestig Wachtwoord" id="comfirm-password"/>
          </label>
          <button type="submit">Account aanmaken</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;