<template>
  <div class="flex flex-wrap">
    <div
      v-for="obj in fclips"
      :key="obj.id"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2"
    >
      <div class="card">
        <a :href="'/clip/' + obj.twitch_clip_id"><img
          class="card-img-top"
          :src="obj.thumbnail_url"
          :alt="obj.title"
        ></a>
        <div class="card-body">
          <h5 class="card-title">
            {{ obj.title }}
          </h5>
          <div
            v-if="fusers"
            class="creator"
          >
            Clipped by <a :href="channel(obj.creator_id)">{{ obj.creator_name }}</a>
          </div>
        </div>

        <span class="view-count">{{ obj.view_count }}</span>
        <span class="clip-date">{{ date(obj.clip_created_date) }}</span>
        <span
          v-if="fusers"
          class="avatar"
          :style="'background-image: url(' + avatar(obj.broadcaster_id) + ')'"
        />
        <span class="broadcaster">{{ obj.broadcaster_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		game: {
			type: String,
			default: 'random'
		}
	},
	data() {
		return {
			fclips: null,
			fusers: null
		}
	},
	computed: {
		idqs: function () {
			let idList = []
			this.fclips.forEach(function (clip) {
				idList.push(clip.broadcaster_id)
				idList.push(clip.creator_id)
			})
			return `?id=${idList.join()}`
		},
		userInfo: function () {

			return this.fusers.reduce(function(r, a) {
				r[a.id] = r[a.id] || []
				r[a.id].push(a.login, a.profile_image_url)
				return r
			}, {})

		}
	},
	created() {
		this.getClips()
	},
	mounted() {
		console.log('Component mounted.')
	},
	methods: {
		async getClips() {
			try {
				const response = await window.axios.get('/api/clips/top' + `?game=${this.game}`)
				this.fclips = response.data
				this.getUsers()
			} catch (e) {
				console.error(e)
			}
		},
		async getUsers() {
			try {
				const response = await window.axios.get('/api/users/twitch' + this.idqs)
				this.fusers = response.data.data
			} catch (e) {
				console.error(e)
			}
		},
		avatar(id) {
			return this.userInfo[id][1]
		},
		channel(id) {
			return `https://www.twitch.tv/${this.userInfo[id][0]}`
		},
		date(createdDate) {
			return window.moment.utc(createdDate).fromNow()
		}
	}
}
</script>

<style lang="scss" scoped>
.card {
	position: relative;
	width: 100%;
	max-width: 339px;
	margin: 0 auto;
	height: 350px;
	border-radius: 25px;
	box-shadow: 3px 3px 6px 0px #ececec;
	border: none;

	.card-img-top {
		background: #399ACC;
		width: 100%;
		height: 170px;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
	}

	.card-body {
		.card-title {
			font-size: 16px;
			font-weight: bold;
			margin-top: 25px;
			margin-bottom: 0;
		}

		.creator {
			font-size: 14px;
			font-weight: 300;
			font-style: italic;
			color: #929292;
			margin-bottom: 15px;

			a {
				color: #399ACC;

				&:hover {
					text-decoration: none;
				}
			}
		}
	}

	.view-count {
		max-width: 80px;
		padding: 5px;
		border-radius: 10px;
		background-color: #ce4d4d;
		position: absolute;
		top: 10px;
		left: 10px;
		color: white;
		text-align: center;
		font-size: 12px;
		pointer-events: none;
	}

	.clip-date {
		max-width: 150px;
		padding: 5px;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 10px;
		right: 10px;
		color: white;
		text-align: center;
		font-size: 12px;
		pointer-events: none;
	}

	.avatar {
		background: #399ACC;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain;
		width: 75px;
		height: 75px;
		border-radius: 50%;
		border: 3px solid white;
		position: absolute;
		top: 131px;
		left: 15px;
		//transform: translateX(-50%);
		pointer-events: none;
	}

	.duration {
		width: 100px;
		padding: 5px;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		bottom: 257px;
		right: 0;
		color: white;
		text-align: center;
		font-size: 12px;
		pointer-events: none;
	}

	.broadcaster {
		position: absolute;
		top: 140px;
		left: 100px;
		color: white;
		font-weight: bold;
		font-size: 18px;
		pointer-events: none;
	}
}

</style>
