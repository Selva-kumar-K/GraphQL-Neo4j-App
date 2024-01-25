const {gql} = require('apollo-server')

const typeDefs = gql`

    type Query{
        allBusinesses(
            first: Int = 10,
            offset : Int = 0
        ) : [Business!]!
        businessBySearchTerm(
            search: String!,
            first: Int = 10,
            offset: Int = 0,
            orderBy: BusinessOrdering = name_asc
            ): [Business]
        userById(id : ID!): User
    }

    type Business{
        businessId: ID!
        name : String
        address: String
        avgStars : Float
        photos : [Photo!]!
        reviews : [Review!]!
    }

    type User{
        userId : ID!
        name : String
        photos: [Photo!]!
        reviews: [Review!]!
    }

    type Photo{
        photoId: ID!
        business: Business!
        user: User!
        url : String
    }

    type Review{
        reviewId: ID!
        user: User!
        business : Business!
        stars: Float
        text: String
    }

    enum BusinessOrdering{
        name_asc
        name_desc
    }
`

module.exports = typeDefs