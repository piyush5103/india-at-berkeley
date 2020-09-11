import React from "react";
import Moment from 'react-moment';
import { Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import colors from "styles/colors";
import PropTypes from "prop-types";
import dimensions from "styles/dimensions";


const PostCardContainer = styled("a")`
	border: 1px solid ${colors.grey200};
	
    border-radius: 3px;
    text-decoration: none;
    color: currentColor;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
    transition: all 150ms ease-in-out;

    &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
        transition: all 150ms ease-in-out;
        cursor: pointer;



        .PostCardAction {
            color: ${colors.blue500};
            transition: all 150ms ease-in-out;

            span {
                transform: translateX(0px);
                opacity: 1;
                transition: transform 150ms ease-in-out;
            }
        }
    }
`

const PostCategory = styled("h6")`
	font-weight: 600;
    color: ${colors.grey600};
`

const PostTitle = styled("h3")`
    margin-bottom: 0.5em;
    margin-top: 0.3em;
`

const PostMetas = styled("div")`
    display: flex;
    align-items: center;
    margin-top: 1.5em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const PostAuthor = styled("div")`
    margin: 0;
`

const PostDate = styled("div")`
    margin: 0;
`
const PostImage = styled("div")`
    margin: 0;

`

const PostDescription = styled("div")`
    


    p:last-of-type {
        margin: 0;
	}
	
	margin-bottom: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 2em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 2.5em;
    }
`

const PostCardAction = styled("div")`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
	}

`

const PostContent = styled('div')`
	padding: 1em 2.5em 2em 2.5em;
`

const PostCard = ({ category, title, description, thumbnail, uid, date }) => (
	<PostCardContainer className="BlogPostCard" target="_blank">

		<PostImage>
			<img src={thumbnail.url} alt={title[0].text} height="220px" width="300px" />

		</PostImage>
		<PostContent>
			<PostCategory>
				{category[0].text}
			</PostCategory>
			<PostTitle>
				{title[0].text}
			</PostTitle>
			<PostDescription>
				{RichText.render(description)}
			</PostDescription>
			<PostCardAction className="PostCardAction">
				See more <span>&#8594;</span>
			</PostCardAction>
			<PostMetas>
				<PostDate>
					<Moment format="MMMM D, YYYY">{date}</Moment>
				</PostDate>
			</PostMetas>
		</PostContent>


	</PostCardContainer>
)

export default PostCard;

PostCard.propTypes = {
	title: PropTypes.array.isRequired,
	description: PropTypes.array.isRequired,
	uid: PropTypes.string.isRequired,
	linkedin: PropTypes.string.isRequired
}
