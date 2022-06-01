import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import TodoContainer from './components/TodoContainer';
import { auth } from './utils/firebase.config';
import Register from './components/Register';

const App = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="App">
      {
        user ? <TodoContainer userId={user.uid} /> : <Register />
      }

    </div>
  );
};

export default App;
