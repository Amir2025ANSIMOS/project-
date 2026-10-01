import React from "react";
import { useParams, Link } from "react-router-dom";
import postsData from "../Blog/posts.json";

export default function BlogDetails() {
  const { id } = useParams();

  const blogs = Array.isArray(postsData)
    ? postsData
    : postsData.default || postsData.posts || [];

  const blog = blogs.find((item) => String(item.id) === String(id));

  // تحديث عنوان الصفحة وتفاصيلها والطلوع لأعلى الصفحة عند الضغط على أي مقترح
  React.useEffect(() => {
    if (blog) {
      document.title = `${blog.title} - عدسة`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, blog]);

  if (!blog) {
    return (
      <div
        className="text-center text-white py-5"
        style={{
          backgroundColor: "#121212",
          minHeight: "100vh",
          direction: "rtl",
        }}
      >
        <h3>المقال غير موجود</h3>
        <Link to="/blog" className="btn btn-warning mt-3">
          العودة إلى المدونة
        </Link>
      </div>
    );
  }

  // --- دالة معالجة النص ---
  const parseContentToSections = (rawContent) => {
    if (!rawContent) return { intro: "", sections: [] };

    if (blog.sections && Array.isArray(blog.sections) && blog.sections.length > 0) {
      return { intro: blog.description || "", sections: blog.sections };
    }

    const parts = rawContent.split("##").map((p) => p.trim()).filter(Boolean);
    let intro = "";
    let startIndex = 0;

    if (parts.length > 0 && !parts[0].includes(".")) {
      intro = parts[0];
      startIndex = 1;
    } else {
      intro = blog.description || "مقدمة المقال";
      startIndex = 0;
    }

    const sections = [];

    for (let i = startIndex; i < parts.length; i++) {
      let currentPart = parts[i];
      let title = "";
      let content = "";

      const periodIndex = currentPart.indexOf(".");
      const arabicPeriodIndex = currentPart.indexOf(".");

      let splitIndex = periodIndex !== -1 ? periodIndex : arabicPeriodIndex;

      if (splitIndex !== -1 && splitIndex < 50) {
        title = currentPart.substring(0, splitIndex).trim();
        content = currentPart.substring(splitIndex + 1).trim();
      } else {
        const words = currentPart.split(" ");
        title = words.slice(0, 5).join(" ");
        content = words.slice(5).join(" ");
      }

      if (title) {
        sections.push({ title, content: content || title });
      }
    }

    return { intro, sections };
  };

  const parsedData = parseContentToSections(blog.content || blog.description);

  // --- اختيار مقالات مقترحة (مشابهة أو عشوائية غير المقال الحالي) ---
  const suggestedBlogs = blogs
    .filter((item) => String(item.id) !== String(id))
    .slice(0, 3);

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        direction: "rtl",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* 1. رأس الصفحة (Hero Header) */}
      <div
        className="container-fluid py-5 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "50px",
        }}
      >
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-muted small mb-3">
            <Link to="/" className="text-decoration-none text-muted">
              الرئيسية
            </Link>{" "}
            &gt;{" "}
            <Link to="/blog" className="text-decoration-none text-muted">
              المدونة
            </Link>{" "}
            &gt; <span className="text-warning">{blog.category}</span>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
              {blog.category}
            </span>
            <span className="text-muted small d-flex align-items-center gap-1">
              <i className="bi bi-calendar3"></i> {blog.date || "٢٢ ديسمبر ٢٠٢٥"}
            </span>
            <span className="text-muted small d-flex align-items-center gap-1">
              <i className="bi bi-clock"></i> {blog.readTime || "١٠ دقائق للقراءة"}
            </span>
          </div>

          <h1 className="fw-bold display-5 mb-4" style={{ lineHeight: "1.4" }}>
            {blog.title}
          </h1>

          <div className="d-inline-flex align-items-center gap-2 bg-dark px-3 py-2 rounded-pill border border-secondary">
            <img
              src={blog.authorImage || "https://via.placeholder.com/40"}
              alt={blog.author?.name || blog.author || "الكاتب"}
              className="rounded-circle"
              style={{ width: "35px", height: "35px", objectFit: "cover" }}
            />
            <div className="text-end">
              <h6 className="mb-0 text-white fs-6" style={{ fontSize: "14px" }}>
                {blog.author?.name || blog.author || "محمد علي"}
              </h6>
              <small className="text-muted" style={{ fontSize: "11px" }}>
                {blog.author?.role || blog.authorTitle || "مصور محترف"}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* 2. تخطيط المحتوى والفهرس الجانبي */}
      <div className="container mt-5" style={{ maxWidth: "1140px" }}>
        <div className="row g-4">
          
          {/* محتوى المقال الأساسي */}
          <div className="col-lg-8">
            <div
              className="p-4 p-md-5 rounded-4 shadow-lg"
              style={{ backgroundColor: "#181818", border: "1px solid #282828" }}
            >
              {/* المقدمة */}
              {parsedData.intro && (
                <p
                  className="lead text-light mb-5 p-4 rounded-3"
                  style={{
                    lineHeight: "1.8",
                    fontSize: "1.15rem",
                    backgroundColor: "#1e1e1e",
                    borderRight: "4px solid #ffc107",
                  }}
                >
                  "{parsedData.intro}"
                </p>
              )}

              {/* الأقسام التفصيلية */}
              {parsedData.sections.map((section, index) => (
                <div key={index} id={`section-${index}`} className="mb-5 pt-3">
                  <h3
                    className="text-warning fw-bold mb-3 fs-4 d-flex align-items-center gap-3"
                    style={{ borderBottom: "1px solid #333", paddingBottom: "15px" }}
                  >
                    <span
                      className="rounded bg-warning bg-opacity-10 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px", fontSize: "18px" }}
                    >
                      🟠
                    </span>
                    {section.title}
                  </h3>
                  <p
                    className="text-secondary"
                    style={{
                      lineHeight: "1.9",
                      fontSize: "1.1rem",
                      color: "#ccc",
                    }}
                  >
                    {section.content}
                  </p>
                </div>
              ))}

              <hr className="border-secondary my-5" />

              {/* الوسوم */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <span className="text-warning small fw-bold ms-2">الوسوم:</span>
                {blog.tags &&
                  blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge bg-dark text-light border border-secondary px-3 py-2 rounded-pill"
                      style={{ fontSize: "12px", fontWeight: "normal" }}
                    >
                      #{tag}
                    </span>
                  ))}
              </div>

              {/* أزرار المشاركة */}
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 bg-dark p-3 rounded-3 border border-secondary">
                <span className="text-white fw-bold d-flex align-items-center gap-2">
                  <i className="bi bi-share text-warning"></i> شارك المقال
                </span>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-light rounded-circle" style={{width:'35px', height:'35px'}}><i className="bi bi-facebook"></i></button>
                  <button className="btn btn-sm btn-outline-light rounded-circle" style={{width:'35px', height:'35px'}}><i className="bi bi-twitter-x"></i></button>
                  <button className="btn btn-sm btn-outline-light rounded-circle" style={{width:'35px', height:'35px'}}><i className="bi bi-linkedin"></i></button>
                  <button className="btn btn-sm btn-outline-light rounded-circle" style={{width:'35px', height:'35px'}}><i className="bi bi-whatsapp"></i></button>
                </div>
              </div>
            </div>

            {/* بطاقة كاتب المقال */}
            <div
              className="p-4 rounded-4 mt-4 d-flex align-items-center gap-4 shadow-xl"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2d2d2d",
              }}
            >
              <img
                src={blog.authorImage || "https://via.placeholder.com/80"}
                alt={blog.author?.name || blog.author || "الكاتب"}
                className="rounded-circle border-2 border-warning"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <span className="text-warning small fw-bold">كاتب المقال</span>
                <h4 className="text-white mb-1 fs-5">
                  {blog.author?.name || blog.author || "محمد علي"}
                </h4>
                <p
                  className="text-muted small mb-0"
                  style={{ fontSize: "13px", lineHeight: "1.6" }}
                >
                  {blog.authorBio ||
                    "مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي."}
                </p>
              </div>
            </div>
          </div>

          {/* الشريط الجانبي (Sidebar) */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4 sticky-top" style={{ top: "100px" }}>
              
              {/* الفهرس الجانبي */}
              <div
                className="p-4 rounded-4 shadow-xl"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2d2d2d",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                  <i className="bi bi-list-nested fs-5"></i>
                  <h5 className="mb-0 fw-bold">محتويات المقال</h5>
                </div>
                <ul className="list-unstyled m-0 d-flex flex-column gap-2">
                  {parsedData.sections.map((section, index) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(`section-${index}`);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className="text-decoration-none text-light d-flex justify-content-between align-items-center p-2 rounded hover-bg text-sm"
                        style={{ transition: "0.2s", fontSize: "14px", cursor: "pointer" }}
                      >
                        <span>{section.title}</span>
                        <span
                          className="bg-dark text-muted rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "24px", height: "24px", fontSize: "12px" }}
                        >
                          {index + 1}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* كارت النشرة البريدية */}
              <div
                className="p-4 rounded-4 shadow-xl text-center"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2d2d2d",
                }}
              >
                <div className="mb-3 text-warning fs-3">
                  <i className="bi bi-envelope-heart"></i>
                </div>
                <h5 className="text-white fw-bold mb-2">لا تفوت جديدنا</h5>
                <p className="text-muted small mb-3">
                  اشترك للحصول على أحدث المقالات والتحديثات مباشرة في بريدك.
                </p>
                <Link
                  to="/blog"
                  className="btn btn-warning w-100 fw-bold rounded-pill py-2 text-dark"
                >
                  تصفح المزيد
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* 3. قسم مقالات قد تعجبك (Suggested Posts) تحت المحتوى */}
        <div className="mt-5 pt-4 border-top border-secondary">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="text-white fw-bold d-flex align-items-center gap-2">
              <span className="text-warning">🔥</span> مقالات قد تعجبك
            </h3>
            <Link to="/blog" className="text-warning text-decoration-none small fw-bold">
              استكشف الكل &larr;
            </Link>
          </div>

          <div className="row g-4">
            {suggestedBlogs.map((item) => (
              <div key={item.id} className="col-md-4">
                <div
                  className="card h-100 rounded-4 overflow-hidden border border-secondary shadow-lg hover-card"
                  style={{ backgroundColor: "#181818", transition: "0.3s" }}
                >
                  {/* هنا تم ربط الصورة بـ Link بحيث لو داس عليها تفتح المقال */}
                  <Link to={`/blog/${item.id}`} style={{ height: "180px", overflow: "hidden", position: "relative", display: "block" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span
                      className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill fw-bold"
                      style={{ fontSize: "11px", zIndex: 2 }}
                    >
                      {item.category}
                    </span>
                  </Link>

                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title text-white fw-bold fs-6 mb-3" style={{ lineHeight: "1.5" }}>
                      {item.title}
                    </h5>
                    <p className="card-text text-muted small mb-4" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      {item.description ? item.description.substring(0, 80) + "..." : ""}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/blog/${item.id}`}
                        className="btn btn-outline-warning w-100 rounded-pill py-2 fw-bold"
                        style={{ fontSize: "13px" }}
                      >
                        اقرأ المقال
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .hover-bg:hover {
          background-color: #282828 !important;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: #ffc107 !important;
        }
      `}</style>
    </div>
  );
}