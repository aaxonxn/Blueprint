# College Timetable App

A modern, responsive web application for managing your college timetable with real-time progress tracking and beautiful UI.

## Features

### 📅 Timetable View
- **Daily Schedule Display**: View your timetable for any day with clean, organized period cards
- **Real-time Progress**: Current period is highlighted and shows progress with a visual indicator
- **Smart Fading**: Past periods are grayed out, current period is emphasized, future periods are normal
- **Swipe Navigation**: Swipe left/right or use arrow buttons to navigate between days
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### ⚙️ Settings Management
- **Multiple Timetables**: Create and manage multiple timetables (e.g., different semesters)
- **Period Management**: Add, edit, and delete periods with detailed information
- **Color Coding**: Assign custom colors to different periods for easy identification
- **Time Management**: Set start and end times for each period

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, modern interface with smooth animations
- **Progress Indicators**: Visual progress bars for current periods
- **Touch-Friendly**: Optimized for mobile devices with swipe gestures
- **Accessibility**: Proper contrast and readable typography

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Usage

### Creating Your First Timetable

1. **Navigate to Settings**: Click the "Settings" tab at the bottom
2. **Create Timetable**: Click "Add Timetable" and enter a name
3. **Add Periods**: Select your timetable and click the "+" button to add periods
4. **Fill Period Details**:
   - Period name (e.g., "Mathematics")
   - Subject (e.g., "Calculus")
   - Teacher name
   - Room number
   - Start and end times
   - Color (optional)

### Using the Timetable

1. **View Today's Schedule**: The app opens to today's timetable by default
2. **Navigate Days**: Swipe left/right or use arrow buttons to change days
3. **Track Progress**: Current period is highlighted with a progress bar
4. **Quick Overview**: Past periods are faded, current is emphasized, future is normal

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation utilities
- **CSS3** - Modern styling with animations

## Project Structure

```
src/
├── components/          # React components
│   ├── Timetable.tsx   # Main timetable view
│   ├── PeriodCard.tsx  # Individual period display
│   ├── Settings.tsx    # Timetable management
│   └── Navigation.tsx  # Bottom navigation
├── types/              # TypeScript type definitions
│   └── timetable.ts    # Data structures
├── utils/              # Utility functions
│   └── timeUtils.ts    # Time calculations
└── App.tsx             # Main app component
```

## Features in Detail

### Real-time Progress Tracking
- Automatically detects current period based on time
- Shows visual progress bar for ongoing periods
- Updates in real-time without page refresh

### Smart Period Status
- **Past**: Grayed out with reduced opacity
- **Current**: Highlighted with progress indicator and pulse animation
- **Future**: Normal display with full opacity

### Swipe Navigation
- Touch-friendly swipe gestures for mobile
- Smooth animations between days
- Visual feedback during swipes

### Data Persistence
- All data is stored in browser memory
- No external dependencies or databases required
- Easy to extend with localStorage or backend

## Customization

### Colors
You can customize the color scheme by modifying the CSS variables in the component files.

### Time Format
The app uses 24-hour format internally but displays 12-hour format to users.

### Period Structure
Each period includes:
- Name (e.g., "Mathematics")
- Subject (e.g., "Calculus")
- Teacher
- Room
- Start/End times
- Custom color

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own college timetable management!

## Support

If you encounter any issues or have questions, please open an issue on the repository. 