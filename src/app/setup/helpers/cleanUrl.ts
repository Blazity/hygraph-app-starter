const cleanUrl = (url: string) => {
  // Skip parsing if no protocol is present
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname + parsedUrl.pathname.replace(/\/$/, '');
  } catch (error) {
    return '';
  }
};

export { cleanUrl };
