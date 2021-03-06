require 'digest'

class User < ActiveRecord::Base
attr_accessor :password
attr_accessible :name, :email, :password, :password_confirmation
has_many :events, :dependent => :destroy
has_many :tasks, :dependent => :destroy
has_many :follows, :foreign_key => "follower_id", :dependent => :destroy
has_many :invites, :foreign_key =>"uid"


has_many :takens, :foreign_key => "taker_id",
				  :dependent => :destroy

has_many :doing_tasks, :through => :takens, :source => :taken
# has_many  :doing_tasks, :through => :takens, :source => :taken

email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, :presence => true,
  				   :length   => { :maximum => 50}
  validates :email, :presence =>true
  validates :email, :presence => true,
					:format       => { :with => email_regex },
					:uniqueness	 => { :case_sensitive => false }
validates :password, :presence => true,
						:confirmation => true,
						:length  => { :within => 6..40 }

validates :password_confirmation, :presence => true

before_save :encrypt_password

# Return true if the user's password matches the submitted password.
def has_password?(submitted_password)
	encrypted_password == encrypt(submitted_password)
end
def following?(followed)
	follows.find_by_followed_id(followed)
end

def followevent!(followed) 
	follows.create!(:followed_id => followed.id)
end

def unfollow!(followed)
	follows.find_by_followed_id(followed).destroy
end

def followfind(follower)
	return follows.find_by_followed_id(follower)

end

def invitesend(eve)
	invites.create(:eid => :eve.id)
end

def uninvite!(followed)
	invites.find_by_invite_id(followed).destroy
end

def taken?(task)

	self.takens.where("taken_id = ?",task.id).present?

end

def take!(taken)

	takens.create!(:taken_id => taken.id)

end

def leave_task!(taken)
	self.takens.find_by_id(taken).destroy
	
end

	#def feed
# This is preliminary. See Chapter 12 for the full implementation.
#Micropost.where("user_id = ?", id)
#end
private
	def encrypt_password
		self.salt = make_salt if new_record?
		self.encrypted_password = encrypt(password)
	end
	def encrypt(string)
		secure_hash("#{salt}--#{string}")
	end
	def make_salt
		secure_hash("#{Time.now.utc}--#{password}")
	end
	def secure_hash(string)
		Digest::SHA2.hexdigest(string)
	end




def self.authenticate(email, submitted_password)
user = find_by_email(email)
return nil if user.nil?
return user if user.has_password?(submitted_password)
end

def self.authenticate_with_salt(id)#, cookie_salt)
user = find_by_id(id) 
return user
#(user && user.salt == cookie_salt) ? user : nil
end



end
