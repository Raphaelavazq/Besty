# UI Component Library - Usage Examples

## ⚠️ Important: Design Preservation

These components are designed to **maintain the exact same visual appearance** as existing code. When refactoring, the UI should look **identical** before and after.

---

## Button Component

### Before (duplicate code):

```jsx
<button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95">
  Start Test
</button>
```

### After (reusable component):

```jsx
import { Button } from "@/components/ui";

<Button variant="primary">Start Test</Button>;
```

**Result**: Looks exactly the same ✅

---

## Card Component

### Before (duplicate code):

```jsx
<div className="bg-white/80 backdrop-blur-md border border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### After (reusable component):

```jsx
import { Card } from "@/components/ui";

<Card variant="glass" padding="md" hover onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>;
```

**Result**: Looks exactly the same ✅

---

## GradientHeading Component

### Before (duplicate code):

```jsx
<h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
  Welcome to B1 Bestie
</h1>
```

### After (reusable component):

```jsx
import { GradientHeading } from "@/components/ui";

<GradientHeading level="h1">Welcome to B1 Bestie</GradientHeading>;
```

**Result**: Looks exactly the same ✅

---

## LoadingSpinner Component

### Before (duplicate code):

```jsx
<div className="flex items-center justify-center min-h-screen">
  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
</div>
```

### After (reusable component):

```jsx
import { LoadingSpinner } from "@/components/ui";

<LoadingSpinner fullScreen />;
```

**Result**: Looks exactly the same ✅

---

## Badge Component

### Before (duplicate code):

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
  Completed
</span>
```

### After (reusable component):

```jsx
import { Badge } from "@/components/ui";

<Badge variant="success">Completed</Badge>;
```

**Result**: Looks exactly the same ✅

---

## IconGrid Component

### Before (duplicate code):

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div
      key={item.id}
      onClick={() => navigate(item.href)}
      className="bg-white/80 backdrop-blur-md border border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
        <item.icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 text-center">{item.description}</p>
    </div>
  ))}
</div>
```

### After (reusable component):

```jsx
import { IconGrid } from "@/components/ui";

<IconGrid items={items} columns={3} />;
```

**Result**: Looks exactly the same ✅

---

## Refactoring Strategy

### 1. **Identify duplicate patterns**

Search for repeated className combinations:

- `bg-gradient-to-r from-purple-600 to-indigo-600`
- `bg-white/80 backdrop-blur-md border border-purple-100`
- `rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1`

### 2. **Replace with component**

Keep the same visual output, just cleaner code.

### 3. **Verify visually**

After refactoring, compare screenshots to ensure **zero visual changes**.

### 4. **No design changes**

- ❌ Don't change colors
- ❌ Don't change spacing
- ❌ Don't change animations
- ✅ Only replace duplicate code

---

## Next Steps

Ready to start refactoring? I'll:

1. Find files with duplicate patterns
2. Replace with reusable components
3. Keep the exact same visual design
4. Verify no visual changes

**The app will look identical, but the code will be cleaner!** 🎯
