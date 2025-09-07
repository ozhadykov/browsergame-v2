
# 🔧 Where Is My Wrench?

**A team-built HTML Canvas browser game showcasing object-oriented programming, custom animations, and event-driven UI architecture — all in vanilla JavaScript.**

<!-- Add your GIF here -->
*[Your gameplay GIF will go here]*

## 🎮 What is it?

**Where Is My Wrench?** is a browser-based adventure game developed as a university project by a team of 5 students. Built entirely with vanilla JavaScript and HTML Canvas, this project demonstrates clean object-oriented architecture, custom event systems, and collaborative development practices.

The game showcases our commitment to writing maintainable code without frameworks, featuring carefully structured classes for game entities, a sophisticated window manager for UI state handling, and smooth canvas-based animations created by our talented graphics team.

## ✨ Key Features

- **🏗️ Clean OOP Architecture** - Well-structured classes and abstractions for game entities, states, and behaviors
- **🎭 Custom Window Manager** - Event-driven UI system for handling different game states and transitions
- **🎨 Canvas-Based Graphics** - Smooth animations and custom graphics entirely rendered on HTML Canvas
- **👥 Team Collaboration** - Built through Git workflows, code reviews, and peer mentoring
- **📱 Cross-Browser Compatible** - Works on all modern browsers without external dependencies
- **🚀 Vanilla JavaScript** - Zero frameworks, pure JavaScript implementation

## UML:
![Screenshot](klassendiagramm.png)


## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas API
- **Architecture**: Object-Oriented Programming
- **Development**: Git workflows, code reviews, collaborative development


## 📋 Prerequisites

Before running the game, make sure you have:

- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Edge, Safari)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ozhadykov/browsergame-v2.git
   cd browsergame-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal) to start playing!

## 🎯 How to Play

- Use WASD to move your character
- Use spacebar to charge the jump
- Find your missing wrench to complete the level
- Navigate through different game states using the custom UI system


## 🏗️ Project Structure

```
browsergame-v2/
├── src/
│   ├── classes/          # Game entity classes
│   ├── base-classes/     # Base Game entity classes
│   ├── data/             # functions to generate levels
├── public/
│   ├── assets/
|      ├── Char
|      ├── Sounds
|      ├── background
|      ├── goal
|      ├── mainmenu
|      └── platform
└── README.md
```


## 👥 Team Collaboration

This project was built through:

- **Git Workflows** - Feature branches, pull requests, and merge strategies
- **Code Reviews** - Peer feedback and collaborative problem-solving
- **Knowledge Sharing** - Team members mentoring each other on different technologies
- **Skill Complementarity** - Combining strengths in architecture, graphics, and animation

## 🎨 Technical Highlights

### Object-Oriented Design
- Modular class structure for characters, game states, and UI elements
- Inheritance and composition patterns for code reusability
- Clean separation of concerns between game logic and rendering

### Custom Window Manager
- Event-driven architecture for handling UI states
- Custom events for triggering state transitions
- Modular window system supporting overlays and transitions

### Canvas Graphics
- Smooth frame-based animations
- Custom sprite rendering system
- Responsive canvas that adapts to different screen sizes

## 🤝 Contributing

This is a university project, but we welcome feedback and suggestions! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Our university instructors for project guidance: Prof. Peters, Lars Thomsen
- Team members who contributed their graphics, animation, development expertise: Paul Jergus, Paul Fricke,  Deutschländer Imke,  Sieber Simon Peter.

## 📞 Contact

For questions about this project, feel free to reach out through:
- GitHub Issues
- Project contributors' profiles

---

*Built with ❤️ by a team of 5 business informatics students*

