export const aiMlData = [
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    icon: '🤖',
    summary: 'Core concepts, algorithms, and engineering practices for AI/ML systems.',
    concepts: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Gradient Descent', 'Overfitting', 'Regularization', 'Feature Engineering', 'Model Deployment', 'MLOps', 'Explainability'],
    questions: [
      {
        id: 'ai-ml-001',
        question: 'What is the bias‑variance trade‑off?',
        difficulty: 'medium',
        answer: 'Bias is error from erroneous assumptions in the learning algorithm (under‑fitting). Variance is error from sensitivity to small fluctuations in the training data (over‑fitting). Good models balance both: low bias and low variance. Regularization, more data, and simpler models help manage the trade‑off.'
      },
      {
        id: 'ai-ml-002',
        question: 'Explain how backpropagation works in a neural network.',
        difficulty: 'hard',
        answer: 'Backpropagation computes the gradient of the loss w.r.t. each weight by applying the chain rule from the output layer back to the input layer. For each layer, it multiplies the upstream gradient by the derivative of the activation function, then updates weights using gradient descent (or an optimizer). This propagates error signals efficiently across many layers.'
      },
      {
        id: 'ai-ml-003',
        question: 'What is an ROC curve and what does AUC represent?',
        difficulty: 'easy',
        answer: 'The ROC curve plots the true positive rate against the false positive rate at various threshold settings. AUC (Area Under the Curve) quantifies overall classifier performance; 1.0 is perfect, 0.5 is random guessing. Higher AUC indicates better separability.'
      }
    ]
  }
];
