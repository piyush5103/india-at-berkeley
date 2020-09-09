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

const AboutTitle = styled("h1")`
	margin-bottom: 1em;
`

const Section = styled("div")`
	margin-bottom: 10em;
	display: flex;
	flex-direction: column;
	@media (max-width: ${dimensions.maxwidthTablet}px) {
		margin-bottom: 4em;
	}
	&:last-of-type {
		margin-bottom: 0;
	}
`

const RenderBody = ({ home, projects, meta }) => (
	<>
		<Helmet
			title={`About | Speaker Series India`}
			titleTemplate={`%s | About | Speaker Series India`}
			meta={[
				{
					name: `description`,
					content: meta.description,
				},
				{
					property: `og:title`,
					content: `About | Speaker Series India`,
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

		<AboutTitle>About</AboutTitle>
		{RichText.render(home.about_title)}
		<About bio={home.about_bio} socialLinks={home.about_links} />
	</>
)

export default ({ data }) => {
	//Required check for no data being returned
	const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
	const projects = data.prismic.allProjects.edges
	const meta = data.site.siteMetadata

	if (!doc || !projects) return null

	return (
		<Layout>
			<RenderBody home={doc.node} projects={projects} meta={meta} />
		</Layout>
	)
}

RenderBody.propTypes = {
	home: PropTypes.object.isRequired,
	projects: PropTypes.array.isRequired,
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
