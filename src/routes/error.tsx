export default function Error() {
  return (
    <div class="error-page">
      <h1>Form Error</h1>
      <p>
        We're sorry, but there was an error loading this form. The form 
        configuration may be invalid or corrupted.
      </p>
      <p>
        Please contact the form administrator or try again later.
      </p>
      <div class="error-actions">
        <a href="/" class="button">
          Go to Home
        </a>
      </div>
    </div>
  );
}
