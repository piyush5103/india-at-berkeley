import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"
import PostCard from "components/PostCard"

const AboutTitle = styled("h1")`
  margin-bottom: 0.25em;
`



const BlogTitle = styled("h3")`
  margin-bottom: 1em;
`


const RenderBody = ({ meta }) => (
	<>
		<Helmet
			title={`Join | Speaker Series India`}
			titleTemplate={`%s | Join | Speaker Series India`}
			meta={[
				{
					name: `description`,
					content: meta.description,
				},
				{
					property: `og:title`,
					content: `Join | Speaker Series India`,
				},
				{
					property: `og:description`,
					content: meta.description,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: meta.author,
				},
				{
					name: `twitter:title`,
					content: meta.title,
				},
				{
					name: `twitter:description`,
					content: meta.description,
				},
			].concat(meta)}
		/>



	</>
)



export default ({ data }) => {
	//Required check for no data being returned
	const meta = data.site.siteMetadata

	return (
		<Layout>
			<RenderBody meta={meta} />
			<AboutTitle>Join</AboutTitle>
			<BlogTitle>Timeline here</BlogTitle>
		</Layout>
	)
}

RenderBody.propTypes = {

	meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allPosts(sortBy: post_date_DESC) {
        edges {
          node {
            post_title
            post_hero_image
            post_date
            post_preview_description
            linkedin
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
