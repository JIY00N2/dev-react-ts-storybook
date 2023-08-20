// defaultPage = 페이지 시작 번호,
// limit = 몇 개 단위로 자를 건지
import { useState } from 'react';

type Props = {
  defaultPage: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
};

// total = 총 페이지
const Pagination = ({ defaultPage, limit, total, onChange }: Props) => {
  const [page, setPage] = useState(defaultPage);
  const totalPage = Math.ceil(total / limit);

  const handleChangePage = (newPage: number) => {
    onChange(newPage);
    setPage(newPage);
  };

  return (
    <div>
      <button onClick={() => page !== 0 && handleChangePage(page - 1)}>
        이전
      </button>
      {Array.from(new Array(totalPage), (_, i) => i)
        .filter((i) => {
          if (page < 3) {
            return i < 5;
          } else if (page > totalPage - 3) {
            return i >= totalPage - 5;
          }
          return i >= page - 2 && i <= page + 2;
        })
        .map((i) => (
          <button
            key={i}
            onClick={() => handleChangePage(i)}
            style={{ backgroundColor: page === i ? 'red' : undefined }}
          >
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => page + 1 !== totalPage && handleChangePage(page + 1)}
      >
        이후
      </button>
    </div>
  );
};

export default Pagination;
