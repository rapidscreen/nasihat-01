# Batik Background Setup

## How to add the batik background image:

1. Save your batik pattern image as `batik-pattern.jpg` in the `/public` folder
2. The image should be high resolution (recommended: at least 1920x1080) for best quality
3. The BatikBackground component will automatically use this image

## Usage:

```tsx
import { BatikBackground } from '@/components/BatikBackground';

// Basic usage
<BatikBackground>
  <YourContent />
</BatikBackground>

// With custom settings
<BatikBackground 
  imageUrl="/your-custom-batik.jpg"
  overlayOpacity={0.7}
  className="min-h-screen"
>
  <YourContent />
</BatikBackground>
```

## Current Implementation:

- Used only on the login page
- Provides a semi-transparent white overlay for content readability
- Fully reusable across other pages if needed
- Maintains existing styling without conflicts

## To use your uploaded batik image:

1. Replace the placeholder `/public/batik-pattern.jpg` with your actual batik image
2. The component will automatically display your beautiful blue batik pattern
3. Adjust `overlayOpacity` prop if you need more/less transparency