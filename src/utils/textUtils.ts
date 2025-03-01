// Sample texts for different modes
const normalTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Isn't that amazing? The five boxing wizards jump quickly. How vexingly quick daft zebras jump!",
  "As the sun set behind the mountains, the sky turned a brilliant shade of orange and pink. The birds were returning to their nests, and a gentle breeze rustled the leaves of the trees. It was a perfect end to a beautiful day.",
  "Learning to type quickly and accurately is an essential skill in today's digital world. Regular practice can significantly improve your typing speed and reduce errors. Set aside some time each day to practice, and you'll see improvement in no time.",
  "The ancient city stood in ruins, a testament to a civilization long gone. Archaeologists carefully excavated the site, uncovering artifacts that told stories of daily life thousands of years ago. Each discovery provided a new piece to the historical puzzle.",
  "The chef carefully prepared the ingredients for the evening's special dish. Fresh herbs and spices filled the kitchen with an enticing aroma. Years of experience guided his hands as he transformed simple ingredients into culinary art."
];

const codeTexts = [
  `function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

const result = calculateFactorial(5);
console.log("The factorial of 5 is:", result);`,

  `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,

  `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
  }
}`
];

/**
 * Get a random text based on the specified type
 * @param type The type of text to get ('normal' or 'code')
 * @returns A random text string
 */
export const getRandomText = (type: 'normal' | 'code'): string => {
  const texts = type === 'code' ? codeTexts : normalTexts;
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};