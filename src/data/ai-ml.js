export const aiMlData = [
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    icon: '🤖',
    summary: 'Core concepts of supervised, unsupervised, and reinforcement learning.',
    concepts: ['Supervised Learning', 'Unsupervised Learning', 'Overfitting vs Underfitting', 'Bias-Variance Tradeoff', 'Cross-Validation', 'Evaluation Metrics'],
    questions: [
      {
        id: 'ml-001',
        question: 'Explain the difference between Supervised and Unsupervised Learning.',
        difficulty: 'easy',
        answer: 'Supervised Learning uses labeled datasets to train algorithms that to classify data or predict outcomes accurately (e.g., Linear Regression, Random Forest). Unsupervised Learning uses machine learning algorithms to analyze and cluster unlabeled datasets. These algorithms discover hidden patterns or data groupings without the need for human intervention (e.g., K-Means Clustering, PCA).',
        codeLanguage: 'text'
      },
      {
        id: 'ml-002',
        question: 'What is the Bias-Variance Tradeoff?',
        difficulty: 'hard',
        answer: 'Bias is the simplifying assumptions made by a model to make the target function easier to learn (high bias = underfitting). Variance is the amount that the estimate of the target function will change if different training data was used (high variance = overfitting). The tradeoff is finding the sweet spot where both bias and variance are minimized to ensure the model generalizes well to new, unseen data.',
        codeLanguage: 'text'
      },
      {
        id: 'ml-003',
        question: 'How do you handle imbalanced datasets?',
        difficulty: 'medium',
        answer: '1. Resampling: Oversample the minority class (e.g., SMOTE) or undersample the majority class. 2. Use different evaluation metrics (Precision, Recall, F1-Score, AUC-ROC) instead of Accuracy. 3. Algorithm-level approaches: Use cost-sensitive learning or ensemble methods like Random Forest that handle imbalance better.',
        codeLanguage: 'python'
      },
      {
        id: 'ml-004',
        question: 'What is Cross-Validation?',
        difficulty: 'medium',
        answer: 'Cross-validation is a resampling procedure used to evaluate machine learning models on a limited data sample. The most common is k-fold cross-validation, where the data is divided into k subsets. The model is trained on k-1 subsets and tested on the remaining 1 subset. This is repeated k times, and the average performance metric is taken. It helps prevent overfitting and gives a better estimate of model performance on unseen data.',
        codeLanguage: 'text'
      }
    ]
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning & Neural Networks',
    icon: '🧠',
    summary: 'Architecture and training of deep neural networks, CNNs, RNNs, and Transformers.',
    concepts: ['Backpropagation', 'Activation Functions', 'CNNs', 'RNNs', 'Transformers', 'Gradient Descent', 'Regularization'],
    questions: [
      {
        id: 'dl-001',
        question: 'How does Backpropagation work?',
        difficulty: 'hard',
        answer: 'Backpropagation is the primary algorithm for training neural networks. It calculates the gradient of the loss function with respect to the weights of the network. It applies the chain rule of calculus from the output layer backwards to the input layer. The gradients are then used by an optimization algorithm (like Gradient Descent or Adam) to update the weights and minimize the loss.',
        codeLanguage: 'text'
      },
      {
        id: 'dl-002',
        question: 'Explain the purpose of Activation Functions and name a few common ones.',
        difficulty: 'medium',
        answer: 'Activation functions introduce non-linearity into the output of a neuron, allowing the neural network to learn complex patterns. Without them, the network would just be a linear regression model, regardless of how many layers it has. Common ones: ReLU (Rectified Linear Unit, f(x)=max(0,x)), Sigmoid (outputs 0 to 1, used for binary classification), Tanh (outputs -1 to 1), and Softmax (used in output layer for multi-class classification).',
        codeLanguage: 'python'
      },
      {
        id: 'dl-003',
        question: 'What is the Vanishing Gradient Problem and how is it solved?',
        difficulty: 'hard',
        answer: 'In deep networks (especially RNNs), gradients can become exceedingly small as they are propagated backward through many layers, effectively stopping the early layers from learning. Solutions: 1. Use ReLU activation instead of Sigmoid/Tanh. 2. Use Batch Normalization. 3. Use residual connections (ResNets). 4. In RNNs, use LSTM or GRU architectures which have gates to maintain long-term memory.',
        codeLanguage: 'text'
      },
      {
        id: 'dl-004',
        question: 'Describe the Transformer architecture.',
        difficulty: 'hard',
        answer: 'Transformers rely entirely on a mechanism called Self-Attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. Key components include the Encoder-Decoder structure, Multi-Head Attention (allowing the model to focus on different parts of the sequence simultaneously), Positional Encoding (to inject order information since there is no recurrence), and Feed-Forward Networks.',
        codeLanguage: 'text'
      }
    ]
  },
  {
    id: 'gen-ai',
    title: 'Generative AI & LLMs',
    icon: '✨',
    summary: 'Large Language Models, prompt engineering, RAG, and fine-tuning techniques.',
    concepts: ['LLMs', 'RAG (Retrieval-Augmented Generation)', 'Prompt Engineering', 'Fine-tuning', 'Embeddings', 'Vector Databases'],
    questions: [
      {
        id: 'genai-001',
        question: 'What is Retrieval-Augmented Generation (RAG)?',
        difficulty: 'medium',
        answer: 'RAG is an architecture that augments the capabilities of an LLM by adding an information retrieval system that provides grounding data. Instead of relying solely on its internal training data, the system first retrieves relevant documents from an external vector database based on the user prompt, then passes those documents as context to the LLM to generate an accurate, up-to-date, and hallucination-free response.',
        codeLanguage: 'text'
      },
      {
        id: 'genai-002',
        question: 'What are Word Embeddings and how do Vector Databases use them?',
        difficulty: 'medium',
        answer: 'Word embeddings are dense vector representations of text where words with similar meanings have similar vector representations in a high-dimensional space (e.g., Word2Vec, BERT embeddings). Vector Databases (like Pinecone, Milvus) store these embeddings and allow for extremely fast similarity searches (e.g., finding the closest vectors using Cosine Similarity or Euclidean distance) to power semantic search and RAG.',
        codeLanguage: 'python'
      },
      {
        id: 'genai-003',
        question: 'Explain the difference between Prompt Engineering, RAG, and Fine-Tuning.',
        difficulty: 'hard',
        answer: 'Prompt Engineering modifies the input query to guide the model (no weight changes, no external data). RAG retrieves external data and includes it in the prompt (no weight changes, uses external database). Fine-Tuning retrains the model\'s weights on a specific dataset to adapt its style, behavior, or domain knowledge (changes model weights, requires compute).',
        codeLanguage: 'text'
      }
    ]
  }
];
