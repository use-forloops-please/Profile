import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer>
        <p>© 2024 Luke Janse van Rensburg. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
