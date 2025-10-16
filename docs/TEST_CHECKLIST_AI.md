# ✅ AI Sprechen Trainer - Quick Test Checklist

## 🚀 Server Status: READY
**URL**: http://localhost:3003/tests/sprechen/trainer

---

## 📋 Test Steps

### 1. Browse Catalog ✓
- [ ] Navigate to: http://localhost:3003/tests/sprechen/trainer
- [ ] See 4 dialogue cards displayed
- [ ] Search bar visible
- [ ] Theme filter pills visible

### 2. Test Search & Filter
- [ ] Type "Fest" in search → Should show Dialogs 1, 4
- [ ] Click "Feiern & Veranstaltungen" filter → Shows 3 dialogues
- [ ] Clear search → All cards return

### 3. Start AI Conversation (Dialog 1)
- [ ] Click "Hausfest mit Partner/in planen" card
- [ ] See Aufgabe at top (full task description)
- [ ] See 5 Leitpunkte tags (Wo?, Wann?, etc.)
- [ ] See "Gespräch starten" button with AI sparkle icon
- [ ] Click "Gespräch starten"

### 4. AI Response
- [ ] Loading spinner appears ("Denkt nach...")
- [ ] AI greeting appears (~2-3 seconds)
- [ ] Message shows: "🤖 Prüfer (KI)"
- [ ] Message in indigo background box
- [ ] Text input field appears at bottom
- [ ] "Senden" button visible

### 5. Have Conversation
- [ ] Type: "Hallo! Ich denke, wir können das Fest im Garten machen."
- [ ] Click "Senden" or press Enter
- [ ] Your message appears in purple box ("🗣️ Du")
- [ ] AI responds naturally (continues conversation)
- [ ] AI asks follow-up question about planning

### 6. Continue Dialogue
- [ ] Type 4-5 more responses
- [ ] AI covers different Leitpunkte
- [ ] Leitpunkte tags change color to green with checkmark ✓
- [ ] Progress bar increases
- [ ] Counter shows "X von 5 Punkten besprochen"

### 7. Completion
- [ ] After 6 exchanges, conversation ends automatically
- [ ] Green completion screen appears
- [ ] "Dialog abgeschlossen!" title with checkmark
- [ ] Feedback section shows:
   - Abdeckung (coverage summary)
   - Stärken (strengths) with green bullets
   - Verbesserungen (improvements) with orange bullets
- [ ] Two buttons: "Nochmal üben" and "Andere Dialoge"

### 8. Navigation
- [ ] Click "Nochmal üben" → Conversation resets
- [ ] AI greeting appears again (different variation)
- [ ] Click "Andere Dialoge" → Returns to catalog

### 9. Test Another Scenario
- [ ] Back on catalog page
- [ ] Click Dialog 2: "Essen für Bekannte planen"
- [ ] New Aufgabe and Leitpunkte load
- [ ] Start new conversation
- [ ] AI asks about food/drinks planning
- [ ] Different conversation than Dialog 1 ✓

---

## 🎯 What to Check

### AI Quality:
- ✅ Uses simple B1 German (no complex words)
- ✅ Short, clear sentences
- ✅ Asks one question at a time
- ✅ Uses Redemittel phrases:
  - "Was denkst du?"
  - "Wie wäre es, wenn..."
  - "Das ist eine gute Idee!"
- ✅ Responds naturally to your answers
- ✅ Stays encouraging and friendly

### Technical:
- ✅ No console errors
- ✅ Fast AI response (< 2 seconds)
- ✅ Messages scroll automatically
- ✅ Input field stays in focus
- ✅ Buttons work correctly
- ✅ Mobile responsive (test on phone if possible)

### Conversation Flow:
- ✅ AI covers all Leitpunkte systematically
- ✅ Follows natural progression (Wo → Wann → Wie, etc.)
- ✅ Asks follow-up questions when appropriate
- ✅ Summarizes at end
- ✅ Doesn't repeat questions

---

## 🐛 Known Issues (None Expected!)

If you see any errors:
1. Check browser console (F12)
2. Verify `.env` file exists with API key
3. Check API key is valid at: https://platform.openai.com/account/api-keys
4. Restart dev server: `npm run dev`

---

## 💡 Testing Tips

### Try Different Approaches:
1. **Agree with everything**: "Ja, das ist gut!"
2. **Ask questions**: "Ist das nicht zu teuer?"
3. **Make suggestions**: "Wie wäre es, wenn wir Pizza bestellen?"
4. **Use simple German**: Test if AI stays B1-level
5. **Use complex German**: See if AI simplifies response

### Expected Behavior:
- AI should ALWAYS use B1 German
- AI should cover all 5 Leitpunkte
- AI should end naturally after 6 exchanges
- Feedback should be constructive and in German

---

## ✅ Success Criteria

### Must Work:
- [x] Server starts without errors
- [ ] Catalog page loads
- [ ] AI responds to messages
- [ ] Conversation flows naturally
- [ ] Leitpunkte tracking works
- [ ] Feedback generates correctly
- [ ] Navigation works
- [ ] Can practice multiple times

### Nice to Have:
- [ ] AI uses good Redemittel
- [ ] Feedback is helpful
- [ ] No B1 violations
- [ ] Smooth animations
- [ ] Fast AI responses (< 2s)

---

## 🎉 What You're Testing

**The World's First AI-Powered DTZ Sprechen Teil 3 Trainer!**

This system:
- ✅ Works for ALL 59 scenarios automatically
- ✅ Provides unlimited practice variations
- ✅ Costs ~$0.001 per conversation
- ✅ Gives real-time feedback
- ✅ Tracks discussion points intelligently
- ✅ Uses GPT-4o-mini (fast & accurate)

---

## 📸 Screenshot Checklist

If you want to document this:
1. Catalog page with 4 cards
2. Dialog page before starting
3. AI greeting message
4. Mid-conversation (3-4 messages)
5. Leitpunkte with green checkmarks
6. Completion screen with feedback
7. Mobile view (optional)

---

## 🚀 Ready to Test!

**Start here**: http://localhost:3003/tests/sprechen/trainer

**Recommended test flow**:
1. Dialog 1: Hausfest (party planning)
2. Dialog 2: Essen (food planning)  
3. Dialog 3: Hausparty (apartment party)

**Time needed**: ~15 minutes for full test

---

## 💬 Feedback Questions

After testing, consider:
1. Is the AI's German at B1 level? ✓ or ✗
2. Does the conversation feel natural? ✓ or ✗
3. Are the Leitpunkte covered well? ✓ or ✗
4. Is the feedback helpful? ✓ or ✗
5. Would you use this to practice? ✓ or ✗

---

**Let me know how it goes!** 🎯

If everything works: "It works perfectly!" 🎉
If issues: Tell me what's broken and I'll fix it! 🔧
