const myData = {
    "token": "215bdd4a7b687f96ffe4395516556790b5bd3e4a",
    "username": "Oluwa-femi"
}

const graphQlData = {
    "query": `
    query { 
        user(login: ${myData["username"]}){
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
      }
    `
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type": "application/json",
    Authentication: "bearer "+ myData["token"]
}

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
    const focus = document.querySelector(".focus")
    focus.innerHTML = data.status.emojiHTML
}

const repoData = (data) => {
    const projInfo = document.querySelector('.repositories')
    data.nodes.forEach(proj => {
      const oneRepo = document.createElement('li')
      const repoHTML = `
      <div class="project-box">
        <div class="left-project-box">
          <h2>
            <a href="${proj.url}">${proj.name}</a>
          </h2>
          ${proj.description ? "<p>" + proj.description + "</p>" : ""}
  
  
          <div class="bottom-list">
            <div class="elements" style="${!proj.languages.edges[0] ? "display: none;" : ""}">
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
  
  
          <div class="elements">
            <ion-icon name="star-outline"></ion-icon> 
              <span>
                ${proj.stargazers.totalCount}
            </span>
          </div>
  
          <div class="elements">
              <ion-icon name="git-network-outline"></ion-icon> 
              <span>${proj.forkCount}</span>
            </div>
  
          <div class="elements time">
              Updated on ${new Date(proj.updatedAt).getDate() +
              " " +
              monthArray[new Date(proj.updatedAt).getMonth()]}
          </div>
          </div>
  
        </div>
        <div class="star-box">
          <button>
            <ion-icon name="star-outline" class="mr-1"></ion-icon> <span> Star </span>
          </button>
        </div>
      </div>
      `
      oneRepo.innerHTML = repoHTML
      projInfo.append(oneRepo)
    })
  }
  
const setData = (data) => {
    userData(data.user);
    repoData(data.user.repositories)
}

const GETData = () => {
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON. stringify(graphQlData)
})
.then (res => {(JSON.stringify(res))})
.then(res => {
    setData(res.data)
    console.log(res)
})
.catch (error => {(JSON.stringify(error))});
}

GETData()
// 215bdd4a7b687f96ffe4395516556790b5bd3e4a