# 📹 Wave Dating Website - Content Management Guide

## 🎯 Overview
Your website now has a powerful content management system that makes it easy to customize videos, dating cards, and other content without touching complex code.

## 📂 File Structure for Videos

### Required Video Files:
```
src/assets/img/
├── demo-screen.mp4          # Default demo video (current)
├── app-demo-hero.mp4        # Hero section app demo (recommended)
├── app-features-demo.mp4    # Features section demo (recommended)
├── profile-emma.mp4         # Emma's dating card video
├── profile-alex.mp4         # Alex's dating card video
├── profile-maya.mp4         # Maya's dating card video
├── profile-jordan.mp4       # Jordan's dating card video
├── profile-sam.mp4          # Sam's dating card video
└── portrait_black.png       # Video poster/thumbnail (current)
```

## 🛠️ How to Customize Content

### 1. **Dating Cards** (Easy!)
Edit the `WEBSITE_CONTENT.datingCards` array in `scripts.js`:

```javascript
datingCards: [
    {
        name: 'Emma',           // Person's name
        age: 24,               // Person's age
        description: 'Coffee lover ☕',  // Short bio
        location: 'Los Angeles',         // City
        video: 'assets/img/profile-emma.mp4',  // Video file
        poster: 'assets/img/emma-poster.jpg'   // Video thumbnail
    },
    // Add more cards here...
]
```

### 2. **Phone Mockup Videos**
Update the video sources in `WEBSITE_CONTENT.videos`:

```javascript
videos: {
    hero: {
        src: 'assets/img/app-demo-hero.mp4',      // Main hero demo
        fallback: 'assets/img/demo-screen.mp4',   // Backup video
        poster: 'assets/img/hero-poster.jpg'      // Thumbnail
    },
    features: {
        src: 'assets/img/app-features-demo.mp4',  // Features demo
        fallback: 'assets/img/demo-screen.mp4',   // Backup video
        poster: 'assets/img/features-poster.jpg'  // Thumbnail
    }
}
```

## 🎬 Video Requirements

### **Optimal Video Specs:**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080x1920 (9:16 portrait) for phone mockups
- **Resolution**: 1080x1080 (1:1 square) for dating cards
- **Duration**: 10-30 seconds (loops automatically)
- **File Size**: Under 5MB per video
- **Frame Rate**: 30fps

### **Content Suggestions:**

#### **Hero Video** (Right phone):
- App interface walkthrough
- Swiping through profiles
- Matching animation
- Chat interface

#### **Features Video** (Left phone):
- Different app screens
- Profile creation flow
- Video recording demo
- Settings/preferences

#### **Dating Card Videos**:
- 15-20 second personality clips
- Natural, unposed moments
- Good lighting and audio
- Vertical (portrait) orientation

## 🚀 Advanced Libraries You Could Add

### **1. Video Processing & Enhancement**
```bash
npm install video.js @videojs/themes
```
- **Benefits**: Advanced video controls, custom styling, analytics
- **Use Case**: Better video playback experience

### **2. Intersection Observer for Performance**
```bash
npm install intersection-observer
```
- **Benefits**: Lazy load videos when they come into view
- **Use Case**: Better performance on mobile

### **3. Plyr for Video Players**
```bash
npm install plyr
```
- **Benefits**: Beautiful, accessible video player
- **Use Case**: Enhanced video controls and styling

### **4. Swiper Extensions**
```bash
npm install swiper/modules/keyboard swiper/modules/mousewheel
```
- **Benefits**: Keyboard navigation, mouse wheel control
- **Use Case**: Better user interaction with dating cards

### **5. Lottie for Animations**
```bash
npm install lottie-web
```
- **Benefits**: Lightweight vector animations
- **Use Case**: Heart animations, loading states, match celebrations

### **6. Three.js for 3D Effects** (Advanced)
```bash
npm install three @react-three/fiber @react-three/drei
```
- **Benefits**: 3D phone mockups, particle effects
- **Use Case**: Next-level visual appeal

### **7. Framer Motion** (If switching to React)
```bash
npm install framer-motion
```
- **Benefits**: Advanced page transitions, gesture handling
- **Use Case**: Smooth, app-like interactions

## 🔧 Quick Setup Instructions

### **Step 1: Add Your Videos**
1. Place your MP4 files in `src/assets/img/`
2. Update the file paths in `scripts.js`
3. The build process will copy them to `dist/assets/img/`

### **Step 2: Test Videos**
1. Open browser console (F12)
2. Look for video loading messages
3. Click videos to test play/pause
4. Check for error messages

### **Step 3: Optimize for Production**
1. Compress videos using [HandBrake](https://handbrake.fr/)
2. Create poster images (JPG thumbnails)
3. Test on mobile devices
4. Check loading speeds

## 🎨 Content Creation Tips

### **For Dating Card Videos:**
1. **Authentic moments**: Natural reactions, laughs, gestures
2. **Good lighting**: Well-lit faces, avoid shadows
3. **Clear audio**: Even though muted, good original audio helps
4. **Variety**: Different activities, locations, moods
5. **Diversity**: Various ages, ethnicities, interests

### **For App Demo Videos:**
1. **Screen recordings**: Use your actual app interface
2. **Smooth interactions**: Slow, deliberate gestures
3. **Key features**: Show swiping, matching, chatting
4. **Clean UI**: Remove personal info, use demo accounts

## 🚀 Recommended Workflow

### **Option 1: Start Simple**
```bash
# Just replace the video files with your content
# Keep same filenames, no code changes needed
```

### **Option 2: Custom Content**
```bash
# Edit WEBSITE_CONTENT in scripts.js
# Add your video files
# Customize descriptions and names
```

### **Option 3: Advanced Setup**
```bash
# Add new libraries for enhanced functionality
npm install plyr lottie-web
# Integrate advanced video controls
# Add loading animations
```

## 💡 Pro Tips

1. **Test on Mobile**: Videos behave differently on mobile browsers
2. **Autoplay Policies**: Most browsers block autoplay with sound
3. **Loading States**: Add loading spinners for better UX
4. **Fallback Content**: Always have backup videos
5. **File Optimization**: Compress videos for faster loading

## 🆘 Common Issues & Solutions

### **Videos Not Playing**
- Check file format (must be MP4)
- Verify file paths are correct
- Look at browser console for errors
- Test with smaller file sizes

### **Autoplay Blocked**
- This is normal browser behavior
- Videos will play on user interaction
- Add play buttons if needed

### **Poor Performance**
- Compress videos to under 5MB
- Use lazy loading
- Reduce video resolution if needed

---

## 🔥 Ready to Go?

Your website now has:
- ✅ **5 customizable dating cards** with videos
- ✅ **Dynamic content system** (easy to modify)
- ✅ **Enhanced Swiper** with navigation and autoplay
- ✅ **Better video handling** with loading states
- ✅ **Match animations** and interactions
- ✅ **Mobile optimization** and responsive design

Just replace the video files and update the content object to make it your own! 🚀💖 