const graphqlQuery = `{
  user(login: "Oluwa-femi") {
    avatarUrl
    login
    bio
    name
    websiteUrl
    company
    location
    followers{
      totalCount
    }
    following{
      totalCount
    }
    pinnedItems{
      totalCount
    }
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
  const website = document.querySelectorAll(".webUrl");
  website.forEach((webUrl) => {
    webUrl.innerHTML = data.websiteUrl;
  });
  const company = document.querySelectorAll(".affiliate");
  company.forEach((affiliate) => {
    affiliate.innerHTML = data.company;
  });
  const following = document.querySelectorAll(".follow");
  following.forEach((follow) => {
    follow.innerHTML =data.following.totalCount + " following" ;
  });
  const followersCount = document.querySelectorAll(".followers");
  followersCount.forEach((followers) => {
    followers.innerHTML = "· " + data.followers.totalCount + " followers" ;;
  });
  const starredRepo = document.querySelectorAll(".star");
  starredRepo.forEach((star) => {
    star.innerHTML = data.pinnedItems.totalCount;
  });
  const address = document.querySelectorAll(".location");
  address.forEach((location) => {
    location.innerHTML = data.location;
  });
  const emojiItem = document.querySelector(".emoji");
  emojiItem.innerHTML = data.status.emojiHTML;
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
        <span class="bott-links" style="background: ${proj.languages.edges[0]
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
      <svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> <span class="star-text"> Star </span>
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