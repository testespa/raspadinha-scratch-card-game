
Built by https://www.blackbox.ai

---

# Raspadinha

## Project Overview
Raspadinha is an interactive web application designed for users to engage in scratch card games and participate in exciting prize draws. This application features a variety of scratch cards with real prizes, allowing users to have fun while trying their luck. Users can register, log in, and explore different scratch card options, as well as view available prizes.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd raspadinha
   ```

3. **Open the `index.html` file in your preferred web browser**:
   - Simply double-click the `index.html` file or open it through your browser.

No server setup is required for this static site as it is a front-end application.

## Usage
- **Home Page**: Users can navigate to the home page (`index.html`) to view featured scratch cards and prizes.
- **Scratch Cards**: Access all available scratch card games by visiting the `raspadinhas.html` page.
- **Register**: New users can create an account on the `registrar.html` page.
- **Login**: Existing users can log in via the `entrar.html` page.
- **Prizes**: View the available prizes and winners in the `premios.html` section.

## Features
- **Multiple Scratch Cards**: A variety of games like "Raspa Fácil", "Raspe & Ganhe", and "Raspou, Levou", each with different prize limits.
- **User Registration and Login**: Secure user registration and authentication process.
- **Prize Display**: Real-time display of winners and available prizes in different categories including cash and electronics.
- **Responsive Design**: The application is designed to be user-friendly, enabling easy navigation on both desktop and mobile devices.
- **Admin Panel**: Admins can access a restricted panel to manage users and prizes.

## Dependencies
This project uses basic HTML, CSS, and JavaScript with no external frameworks or libraries indicated in the `package.json`. However, styles are included via the link to `css/style.css` and functionality is enhanced through `js/script.js`.

## Project Structure
```markdown
.
├── index.html            # Home page
├── raspadinhas.html      # All available scratch cards
├── registrar.html        # User registration page
├── entrar.html           # User login page
├── premios.html          # Prize display page
├── admin-login.html      # Admin login page
├── admin.html            # Admin dashboard
├── admin-fixed.html      # Another version of the admin dashboard
├── js/                   # JavaScript files
│   ├── script.js         # Main JavaScript file for functionality
│   └── admin-auth.js     # Admin authentication script
├── css/                  # Stylesheets
│   ├── style.css         # Main styles for the application
│   └── admin.css         # Styles for admin panel
└── images/               # Image assets used in the application
```

## Conclusion
Raspadinha aims to provide an entertaining experience through scratch games and the potential to win real prizes. Designed with user engagement in mind, the project leverages a clean interface and simple navigation to create an enjoyable experience for users.

For any issues or feature requests, please contact the repository maintainer or submit an issue in the GitHub repository.