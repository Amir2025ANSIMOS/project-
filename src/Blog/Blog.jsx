import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import postsData from './posts.json';

export default function Blog() {
  const [blogs, setBlogs] = useState(
    Array.isArray(postsData)
      ? postsData
      : (postsData.default || postsData.posts || [])
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGrid, setIsGrid] = useState(true);

  // استخراج الفئات تلقائياً
  const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];

  // التصفية والبحث
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        direction: 'rtl'
      }}
      className="py-5"
    >
      <div className="container">

        {/* قسم العنوان الرئيسي */}
        <div className="text-center mb-5">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: '#212529',
              color: '#ffc107',
              border: '1px solid #ffc107'
            }}
          >
            📷 مدونتنا
          </span>

          <h1
            className="fw-bold display-5 mb-2"
            style={{ color: '#fff' }}
          >
            استكشف مقالاتنا
          </h1>

          <p
            className="text-muted"
            style={{ fontSize: '1.1rem' }}
          >
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>
        </div>

        {/* شريط البحث والفلترة وأزرار العرض */}
        <div
          className="row mb-5 align-items-center g-3 p-3 rounded-4"
          style={{ backgroundColor: '#1e1e1e' }}
        >

          {/* أزرار الفلترة الأفقية */}
          <div className="col-lg-8 d-flex flex-wrap gap-2 align-items-center">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`btn rounded-pill px-4 py-2 fw-semibold ${
                  selectedCategory === cat ? 'text-dark' : 'text-white'
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === cat ? '#ffc107' : '#2b2b2b',
                  border: 'none',
                  transition: '0.3s'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'جميع المقالات' : cat}
              </button>
            ))}
          </div>

          {/* البحث وأزرار Grid / List */}
          <div className="col-lg-4 d-flex justify-content-lg-end align-items-center gap-2">

            <input
              type="text"
              className="form-control text-white border-0 rounded-pill px-3"
              style={{ backgroundColor: '#2b2b2b' }}
              placeholder="ابحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="btn-group">

              <button
                className={`btn ${
                  isGrid
                    ? 'btn-warning'
                    : 'btn-outline-secondary text-white'
                }`}
                onClick={() => setIsGrid(true)}
                title="عرض شبكي"
              >
                ⊞
              </button>

              <button
                className={`btn ${
                  !isGrid
                    ? 'btn-warning'
                    : 'btn-outline-secondary text-white'
                }`}
                onClick={() => setIsGrid(false)}
                title="عرض قائمة"
              >
                ☰
              </button>

            </div>
          </div>
        </div>

        {/* عدد المقالات المعروضة */}
        <div className="mb-4 text-muted">
          <span>عرض {filteredBlogs.length} مقالات</span>
        </div>

        {/* عرض المقالات Grid / List */}
        <div
          className={
            isGrid
              ? 'row row-cols-1 row-cols-md-3 g-4'
              : 'd-flex flex-column gap-3'
          }
        >

          {filteredBlogs.length > 0 ? (

            filteredBlogs.map((blog) => (

              <div
                key={blog.id}
                className={isGrid ? 'col' : 'w-100'}
              >

                <div
                  className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: '#1e1e1e',
                    color: '#fff'
                  }}
                >

                  {/* صورة المقال (تم تصحيح المسار إلى /blog/) */}
                  <div className="position-relative">
                    <Link to={`/blog/${blog.id}`}>
                      <img 
                        src={blog.image}
                        className="card-img-top"
                        alt={blog.title}
                        style={{ 
                          height: '220px',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                      />
                    </Link>

                    <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-warning border border-warning px-3 py-2 rounded-pill">
                      {blog.category}
                    </span>
                  </div>

                  {/* محتوى الكارت */}
                  <div className="card-body d-flex flex-column p-4">

                    {/* معلومات الوقت وتاريخ النشر */}
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        ⏱️ {blog.readTime || '5 دقائق للقراءة'}
                      </span>
                      <span>
                        📅 {blog.date || '10 ديسمبر 2025'}
                      </span>
                    </div>

                    <h5
                      className="card-title fw-bold mb-3"
                      style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.5'
                      }}
                    >
                      {blog.title}
                    </h5>

                    <p
                      className="card-text text-muted mb-4"
                      style={{ fontSize: '0.95rem' }}
                    >
                      {blog.description?.substring(0, 90)}...
                    </p>

                    {/* زر اقرأ المزيد (تم تصحيح المسار إلى /blog/) */}
                    <Link
                      to={`/blog/${blog.id}`}      
                      className="btn w-100 rounded-pill fw-bold mt-auto"
                      style={{
                        backgroundColor: '#ffc107',
                        color: '#000'
                      }}
                    >
                      اقرأ المزيد
                    </Link>

                  </div>
                </div>
              </div>
            ))

          ) : (

            <p className="text-center text-muted w-100 py-5">
              لا توجد مقالات تطابق بحثك الحالي.
            </p>

          )}

        </div>

      </div>
    </div>
  );
}