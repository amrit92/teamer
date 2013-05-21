# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130521122816) do

  create_table "events", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "description"
    t.datetime "date"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "events", ["user_id"], :name => "index_events_on_user_id"

  create_table "follows", :force => true do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "follows", ["followed_id"], :name => "index_follows_on_followed_id"
  add_index "follows", ["follower_id", "followed_id"], :name => "index_follows_on_follower_id_and_followed_id", :unique => true
  add_index "follows", ["follower_id"], :name => "index_follows_on_follower_id"

  create_table "posts", :force => true do |t|
    t.string   "name"
    t.string   "title"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "takens", :force => true do |t|
    t.integer  "taker_id"
    t.integer  "taken_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "takens", ["taken_id"], :name => "index_takens_on_taken_id"
  add_index "takens", ["taker_id", "taken_id"], :name => "index_takens_on_taker_id_and_taken_id", :unique => true
  add_index "takens", ["taker_id"], :name => "index_takens_on_taker_id"

  create_table "tasks", :force => true do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.string   "title"
    t.string   "description"
    t.datetime "date"
    t.integer  "required"
    t.integer  "signedup"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "encrypted_password"
    t.string   "salt"
    t.boolean  "admin"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
