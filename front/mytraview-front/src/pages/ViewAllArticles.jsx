import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { call } from '../api_config/ApiService';
import curBoardAtom from '../components/atoms/curBoardAtom';
import Pagination from '../components/article/Pagination';
import ArticleCreateButton from '../components/main/ArticleCreateButton';

const ViewAllArticles = () => {

    const [articles, setArticles] = useState([]);
    const [_, setCurBoard] = useAtom(curBoardAtom);
    // const [auth, setAuth] = useAtom(authAtom); 
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    let [postNum, setPostNum] = useState(1)

    const viewCountIncrease = (id) => {
        call(`/article/viewCount?articleId=${id}`, "GET")
            .then((res) => {
                console.log(res);
            })
    } // 조회수 증가함수

    useEffect(() => {
        fetch('http://localhost:8100/article')
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setArticles(response);
            })
            .catch(error => console.error(error))
    }, [])

  return (
    <>
    {/* 배경 넣었으며 색깔 디자인을 손을 대었음 */}
    <div className="bg-[url('/public/images/star_bg.jpg')] opacity-80 bg-cover h-[100vh] text-white">
    <br /><br />
    <br /><br /><br />
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
          className="text-black"
        >
          <option value="10" className="text-sm font-bold text-right text-neutral-600">10개씩</option>
          <option value="15" className="text-sm font-bold text-right text-neutral-600">15개씩</option>
          <option value="20" className="text-sm font-bold text-right text-neutral-600">20개씩</option>
          <option value="30" className="text-sm font-bold text-right text-neutral-600">30개씩</option>
          <option value="50" className="text-sm font-bold text-right text-neutral-600">50개씩</option>
        </select>
      </label>

      <div className="mt-6 overflow-x-auto text-white">
        <div onClick={() => {console.log( articles)}}>전체 리뷰 조회 페이지</div>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left text-[0.9674rem]">
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">No.</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Title</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Writer</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">UploadDate</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Views</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700 bg-white">
            {articles && articles.slice(offset, offset + limit).map(article => (
              <tr key={article.id} className="py-10 border-b border-gray-200 hover:bg-gray-100" >

                <td className="px-4 py-2 text-center border">{postNum++}</td>
 
                <td className="px-4 py-2 text-left text-gray-700 border">
                  <Link to="/ArticleDetailPage">
                    <button onClick={() => {
                    setCurBoard(article.id);
                    viewCountIncrease(article.id)
                  }}>{article.title}</button>
                  </Link>
                </td>

                <td className="px-4 py-2 text-center border">{article.writer}</td>

                <td className="px-2 py-2 text-center border">{article.uploadDate}</td>

                <td className="px-1 py-2 text-center border">{article.viewCount}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          total={articles.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        {/* <Link to="/ArticleCreatePage" className="float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200">글쓰기</Link> */}
        {/* onClick={checkUser} */}

        <ArticleCreateButton />

      </div>
      </div>
    </>
  )
}

export default ViewAllArticles