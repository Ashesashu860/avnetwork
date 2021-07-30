import { useRef, useEffect } from "react";
import BlogSvg from "../../../assets/blog_create.svg";
import {
  MainContainer,
  ContentContainer,
  StyledNavLink,
  StyledFab,
} from "../../../components";
import "./blog-landing-page.css";
import { BlogList } from "..";
import { mockBlogs } from "../../../mocks";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const mapState = (state) => ({
  user: state.user,
});

export const BlogLandingPage = withRouter(({ history }) => {
  const addBlogRef = useRef(null);

  const { user } = useSelector(mapState);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", () => {
      if (!!addBlogRef.current) {
        window.pageYOffset > window.innerHeight - 200
          ? (addBlogRef.current.style.display = "inline-flex")
          : (addBlogRef.current.style.display = "none");
      }
    });
  }, []);

  return (
    <>
      <MainContainer className="fix_wrapper">
        <div className="blog-containers">
          <img src={BlogSvg} alt="Blog" />
        </div>
        <ContentContainer
          heading={"Join millions of others"}
          content={
            "Whether sharing your expertise, knowledge, or whatever’s on your mind, you’re in good company on AVnetwork. Sign up to discover the knowledge spread by thousands of people."
          }
          spacing="2.5rem"
        >
          <div style={{ height: "2.5rem", display: "flex" }}>
            <StyledNavLink
              to={{
                pathname: "/blogs",
                blogs: mockBlogs,
              }}
              style={{ marginRight: "0.5rem" }}
            >
              <StyledFab variant="extended" bold secondary>
                View Blogs
              </StyledFab>
            </StyledNavLink>
            {user && (
              <StyledNavLink to="/blog-create">
                <StyledFab variant="extended" bold primary>
                  New Blog
                </StyledFab>
              </StyledNavLink>
            )}
          </div>
        </ContentContainer>
        <div className="center" style={{ width: "30%" }}>
          <div
            style={{
              height: "5rem",
              width: "100%",
            }}
            className="center"
          >
            AD
          </div>
        </div>
      </MainContainer>
      <ContentContainer
        subHeading={"Latest Blogs"}
        content={"View our latest blogs"}
      />
      <BlogList
        blogs={mockBlogs}
        fabRef={addBlogRef}
        noFab
        direction="row"
        className="remove_top_padding"
      />
      <ContentContainer
        subHeading={"All Blogs"}
        content={"View our all blogs of different categories"}
      />
      <BlogList
        blogs={mockBlogs}
        fabRef={addBlogRef}
        noFab
        className="remove_top_padding"
        autoHeight
      />
    </>
  );
});
