const photos = [];

for (let i = 1; i <= 99; i++) {
  photos.push(
    new URL(`/src/assets/photos/img${i}.jpeg`, import.meta.url).href
  );
}

export default photos;
