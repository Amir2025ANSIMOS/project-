import React from "react";
import { Link } from "react-router-dom";
import postsData from "../Blog/posts.json";

export default function Home() {
  const blogs = Array.isArray(postsData)
    ? postsData
    : postsData.default || postsData.posts || [];

  const featuredArticle = blogs.find((item) => item.featured) || blogs[0];
  const latestArticles = blogs.slice(0, 3);

  const categoriesMap = {};
  blogs.forEach((post) => {
    if (post.category) {
      categoriesMap[post.category] = (categoriesMap[post.category] || 0) + 1;
    }
  });

  const categoryIcons = {
    "إضاءة": "⚙️",
    "بورتريه": "👤",
    "مناظر طبيعية": "🌄",
    "تقنيات": "🔧",
    "معدات": "📷"
  };

  const categoriesList = Object.keys(categoriesMap).map((catName) => ({
    name: catName,
    count: `${categoriesMap[catName]} مقالة`,
    icon: categoryIcons[catName] || "📁"
  }));

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        direction: "rtl",
        minHeight: "100vh",
      }}
    >
      {/* 1. Hero Section */}
      <section className="text-center py-5 container" style={{ maxWidth: "900px", marginTop: "40px" }}>
        <div
          className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
          style={{ backgroundColor: "#1f1f1f", border: "1px solid rgba(255, 193, 7, 0.2)", color: "#ffc107", fontSize: "14px" }}
        >
          <span>✨ مرحباً بك في عدسة</span>
        </div>
        <h1 className="fw-bold display-4 mb-4" style={{ lineHeight: "1.3" }}>
          اكتشف فن <span className="text-warning">التصوير الفوتوغرافي</span>
        </h1>
        <p className="text-muted fs-5 mb-5 mx-auto" style={{ maxWidth: "600px", lineHeight: "1.8" }}>
          انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/blog"
            className="btn btn-warning fw-bold px-4 py-3 rounded-3 text-dark d-flex align-items-center gap-2"
          >
            استكشف المقالات &larr;
          </Link>
          <Link
            to="/blog"
            className="btn px-4 py-3 rounded-3 text-light d-flex align-items-center gap-2"
            style={{ backgroundColor: "#1f1f1f", border: "1px solid #333" }}
          >
            <i className="bi bi-info-circle"></i> اعرف المزيد
          </Link>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="container my-5" style={{ maxWidth: "1140px" }}>
        <div className="row g-4 text-center">
          <div className="col-6 col-md-3">
            <div className="p-4 rounded-4" style={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}>
              <span className="d-block fs-2 fw-bold text-warning mb-1">6</span>
              <span className="text-muted small">كاتب</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 rounded-4" style={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}>
              <span className="d-block fs-2 fw-bold text-warning mb-1">{Object.keys(categoriesMap).length}</span>
              <span className="text-muted small">تصنيفات</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 rounded-4" style={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}>
              <span className="d-block fs-2 fw-bold text-warning mb-1">+10 ألف</span>
              <span className="text-muted small">قارئ</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 rounded-4" style={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}>
              <span className="d-block fs-2 fw-bold text-warning mb-1">{blogs.length}+</span>
              <span className="text-muted small">مقالة</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Article Section (مقالات مختارة) */}
      {featuredArticle && (
        <section className="container my-5" style={{ maxWidth: "1140px" }}>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1 fs-3">مقالات مختارة</h2>
              <p className="text-muted small mb-0">محتوى منتقى لبدء رحلة تعلمك</p>
            </div>
            <Link to="/blog" className="text-warning text-decoration-none small fw-bold">
              عرض الكل &larr;
            </Link>
          </div>

          <Link
            to={`/blog/${featuredArticle.id}`}
            className="card text-decoration-none rounded-4 overflow-hidden border border-secondary shadow-lg hover-card d-block"
            style={{ backgroundColor: "#18181b", transition: "0.3s" }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-6 position-relative" style={{ height: "300px", overflow: "hidden" }}>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-100 h-100 object-fit-cover"
                />
                <span
                  className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {featuredArticle.category}
                </span>
              </div>
              <div className="col-md-6 p-4 p-md-5">
                <div className="text-warning small mb-2 d-flex align-items-center gap-1">
                  <i className="bi bi-clock"></i> {featuredArticle.readTime || "٨ دقائق للقراءة"}
                </div>
                <h3 className="text-white fw-bold fs-4 mb-3" style={{ lineHeight: "1.4" }}>
                  {featuredArticle.title}
                </h3>
                <p className="text-muted small mb-0" style={{ lineHeight: "1.8", fontSize: "14px" }}>
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 3. Categories Section (استكشف حسب الموضوع) */}
      <section className="container my-5 py-4" style={{ maxWidth: "1140px" }}>
        <div className="text-center mb-5">
          <span className="text-warning small fw-bold d-block mb-1">📂 التصنيفات</span>
          <h2 className="fw-bold fs-3 mb-2">استكشف حسب الموضوع</h2>
          <p className="text-muted small">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>

        <div className="row g-4">
          {categoriesList.map((cat, index) => (
            <div key={index} className="col-sm-6 col-md-3">
              <Link
                to={`/blog`}
                className="p-4 rounded-4 text-center border border-secondary text-decoration-none d-block hover-card"
                style={{ backgroundColor: "#18181b", transition: "0.3s" }}
              >
                <div
                  className="mx-auto mb-3 rounded-3 d-flex align-items-center justify-content-center fs-3"
                  style={{ width: "50px", height: "50px", backgroundColor: "rgba(255, 193, 7, 0.1)", color: "#ffc107" }}
                >
                  {cat.icon}
                </div>
                <h5 className="text-white fw-bold fs-6 mb-1">{cat.name}</h5>
                <span className="text-muted" style={{ fontSize: "12px" }}>{cat.count}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Latest Articles Section (أحدث المقالات) */}
      <section className="container my-5" style={{ maxWidth: "1140px" }}>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-warning small fw-bold d-block mb-1">🔥 الأحدث</span>
            <h2 className="fw-bold mb-1 fs-3">أحدث المقالات</h2>
            <p className="text-muted small mb-0">محتوى جديد طازج من المطبعة</p>
          </div>
          <Link to="/blog" className="text-warning text-decoration-none small fw-bold">
            عرض جميع المقالات &larr;
          </Link>
        </div>

        <div className="row g-4">
          {latestArticles.map((article) => (
            <div key={article.id} className="col-md-4">
              <div
                className="card h-100 rounded-4 overflow-hidden border border-secondary shadow-lg hover-card"
                style={{ backgroundColor: "#18181b", transition: "0.3s" }}
              >
                <Link to={`/blog/${article.id}`} style={{ height: "200px", overflow: "hidden", position: "relative", display: "block" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span
                    className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill fw-bold"
                    style={{ fontSize: "11px", zIndex: 2 }}
                  >
                    {article.category}
                  </span>
                </Link>
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title text-white fw-bold fs-6 mb-3" style={{ lineHeight: "1.5" }}>
                    <Link to={`/blog/${article.id}`} className="text-decoration-none text-white hover-warning">
                      {article.title}
                    </Link>
                  </h5>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${article.id}`}
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
      </section>

      {/* 5. Footer (الفوتر المطابق للصور تماماً وبالترتيب الصحيح) */}
      <footer className="pt-5 pb-4 mt-5 border-top border-secondary" style={{ backgroundColor: "#161619" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="row g-4 justify-content-between">
            
            {/* العمود الأول (يمين): عدسة + الوصف + السوشيال ميديا */}
            <div className="col-lg-4 text-end">
              <div className="d-flex align-items-center gap-2 mb-3 justify-content-start flex-row-reverse">
                <span className="badge bg-warning text-dark px-2 py-1 rounded fw-bold fs-6">ع</span>
                <h5 className="text-white fw-bold mb-0">عدسة</h5>
              </div>
              <p className="text-muted small mb-4" style={{ lineHeight: "1.8", fontSize: "13px" }}>
                مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معك أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.
              </p>
              <div className="d-flex gap-2 justify-content-start">
                <a href="#youtube" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "35px", height: "35px" }}><i className="bi bi-youtube"></i></a>
                <a href="#linkedin" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "35px", height: "35px" }}><i className="bi bi-linkedin"></i></a>
                <a href="#instagram" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "35px", height: "35px" }}><i className="bi bi-instagram"></i></a>
                <a href="#twitter" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "35px", height: "35px" }}><i className="bi bi-twitter-x"></i></a>
              </div>
            </div>

            {/* العمود الثاني (وسط): استكشف */}
            <div className="col-6 col-lg-2">
              <h6 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
                <span style={{ width: "4px", height: "16px", backgroundColor: "#ffc107", display: "inline-block", borderRadius: "2px" }}></span>
                استكشف
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "14px" }}>
                <li><Link to="/" className="text-decoration-none text-muted hover-warning">الرئيسية</Link></li>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">المدونة</Link></li>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">من نحن</Link></li>
              </ul>
            </div>

            {/* العمود الثالث (وسط): التصنيفات */}
            <div className="col-6 col-lg-2">
              <h6 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
                <span style={{ width: "4px", height: "16px", backgroundColor: "#ffc107", display: "inline-block", borderRadius: "2px" }}></span>
                التصنيفات
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "14px" }}>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">إضاءة</Link></li>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">بورتريه</Link></li>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">مناظر طبيعية</Link></li>
                <li><Link to="/blog" className="text-decoration-none text-muted hover-warning">تقنيات</Link></li>
              </ul>
            </div>

            {/* العمود الرابع (شمال): ابقَ على اطلاع + البريد */}
            <div className="col-lg-4">
              <h6 className="text-warning fw-bold mb-3 d-flex align-items-center gap-2">
                <span style={{ width: "4px", height: "16px", backgroundColor: "#ffc107", display: "inline-block", borderRadius: "2px" }}></span>
                ابقَ على اطلاع
              </h6>
              <p className="text-muted small mb-3" style={{ fontSize: "13px" }}>
                اشترك للحصول على أحدث المقالات والتحديثات.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-2">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="form-control bg-dark text-white border-secondary form-control-sm py-2"
                />
                <button type="submit" className="btn btn-warning btn-sm fw-bold text-dark py-2">
                  اشتراك
                </button>
              </form>
            </div>

          </div>

          <hr className="border-secondary my-4" />

          {/* حقوق النشر والسياسة */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-muted" style={{ fontSize: "13px" }}>
            <div>
              © 2026 عدسة. صنع بكل <span className="text-danger">❤️</span> جميع الحقوق محفوظة.
            </div>
            <div className="d-flex gap-4">
              <a href="#privacy" className="text-decoration-none text-muted hover-warning">سياسة الخصوصية</a>
              <a href="#terms" className="text-decoration-none text-muted hover-warning">شروط الخدمة</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx="true">{`
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: #ffc107 !important;
        }
        .hover-warning:hover {
          color: #ffc107 !important;
        }
      `}</style>
    </div>
  );
}