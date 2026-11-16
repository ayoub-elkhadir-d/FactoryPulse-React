function EmptyState({ message = 'Aucune machine ne correspond à votre recherche.' }) {
  return (
    <p className="empty-state" role="status">
      {message}
    </p>
  );
}

export default EmptyState;
