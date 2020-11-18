const graphqlQuery = `{
  user(login: "Oluwa-femi") {
    avatarUrl
    login
    bio
    name
    websiteUrl
    twitterUsername
    status {
      emojiHTML
      message
    }
    repositories(first: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          edges {
              node {
                  name
                  color
              }
          }
        }
        description
        homepageUrl
        name
        updatedAt
        url
        forkCount
        watchers {
          totalCount
        }
        stargazers {
          totalCount
        }
        licenseInfo {
          name
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
            url
          }
        }
      }
    }
  }
}`

const userData = (data) => {
  const profileAvatar = document.querySelectorAll(".image");
  profileAvatar.forEach((image) => {
    image.src = data.avatarUrl;
  });
  const names = document.querySelectorAll(".name");
  names.forEach((name) => {
    name.innerHTML = data.name;
  });
  const usernames = document.querySelectorAll(".username");
  usernames.forEach((username) => {
    username.innerHTML = data.login;
  });
  const userBios = document.querySelectorAll(".userBio");
  userBios.forEach((userBio) => {
    userBio.innerHTML = data.bio;
  });
};



const repoData = (data) => {
const projInfo = document.querySelector('#repos')
data.nodes.forEach(proj => {
  const oneRepo = document.createElement('li')
  const projHTML = `
  <div class="repo-list">
    <div class="left-repo-list">
      <h2>
        <a href="${proj.url}">${proj.name}</a>
      </h2>
      ${proj.description ? "<p>" + proj.description + "</p>" : ""}
      <div class="bottom-repo-list">
        <div class="item-prop" style="${!proj.languages.edges[0] ? "display: none;" : ""}">
        <span class="notch" style="background: ${proj.languages.edges[0]
          ? proj.languages.edges[0].node.color
          : ""}">
            </span>
              ${proj.languages.edges[0]
          ? "<span>" +
              proj.languages.edges[0].node.name +
              "</span>"
          : ""}
        </div>
      <div class="item-prop">
          Updated on ${new Date(proj.updatedAt).getDate() +
          " " +
          monthArray[new Date(proj.updatedAt).getMonth()]}
      </div>
      </div>
    </div>
    <div class="star">
      <button>
        <ion-icon name="star-outline" class="mr-1"></ion-icon> <span> Star </span>
      </button>
    </div>
  </div>
  `
  oneRepo.innerHTML = projHTML
  projInfo.append(oneRepo)
})
}
const setData = (data) => {
  userData(data.user);
  repoData(data.user.repositories)
}

const baseUrl = "https://api.github.com/graphql";

const newHeaders = {
  "Content-Type": "application/json",
Accept: "application/json",
Authorization: "bearer " + "765a64ad4daf65d28611aef3ac3015a004edcbad"
};

const GETData = () => {
  fetch(baseUrl, {
      method: "POST",
      headers: newHeaders,
        body: JSON.stringify({query: graphqlQuery}),
    })
        .then(res => res.json())
        .then(res => {
            setData(res.data)
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
GETData()

const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]