class FollowsController < ApplicationController
	before_filter :authenticate
	def create
		@event = Event.find(params[:follow][:followed_id])
		current_user.followevent!(@event)
		redirect_to root_path
	end
	def destroy
		@event = Follow.find(params[:id]).followed
		current_user.unfollow!(@event)
		redirect_to root_path
	end
end
