class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest
      t.string :provider
      t.string :uid
      t.string :oauth_token
      t.datetime :oauth_expires_at
    end
  end
end
