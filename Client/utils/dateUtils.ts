export const convertFirestoreTimestamp = (timestamp: any): Date => {
  if (!timestamp) {
    return new Date();
  }

  if (timestamp instanceof Date) {
    return timestamp;
  }

  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000);
  }

  if (typeof timestamp === 'number') {
    return new Date(timestamp);
  }

  return new Date();
};

export const formatDate = (timestamp: any, format: 'year' | 'full' | 'short' = 'year'): string => {
  const date = convertFirestoreTimestamp(timestamp);

  switch (format) {
    case 'year':
      return date.getFullYear().toString();
    case 'full':
      return date.toLocaleDateString();
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    default:
      return date.getFullYear().toString();
  }
};
