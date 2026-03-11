// export const getVideoCards = (page, limit) => {
//   return fetch(
//     `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`,
//   )
//     .then((res) => res.json())
//     .then((data) => data);
// };
const PAGE_SIZE = 10;
export function getVideoCards(page = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const videos = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = (page - 1) * PAGE_SIZE + i + 1;

        return {
          id,

          title: `Video ${id}`,

          thumbnail: `https://picsum.photos/300/200?random=${id}`,

          duration: Math.floor(Math.random() * 500),
        };
      });

      resolve({
        videos,

        hasMore: page < 20,
      });
    }, 800);
  });
}
