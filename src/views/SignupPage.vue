<template>
    <div class="family-member-modal" v-if="showModal">
        <div class="modal-content">
            <h3>가족 구성원 추가</h3>
            <form @submit.prevent="familySubmit">
                <div class="form-group">
                    <div class="form-input-weight">
                        <span class="input-label">이름 :</span>
                        <input type="text" v-model="aPerson.name" class="input-box1" required>
                        <button type="button" :class="{ 'gender-btn': true, 'selected': aPerson.gender === 'male' }" @click="aPerson.gender = 'male'">남</button>
                        <button type="button" :class="{ 'gender-btn': true, 'selected': aPerson.gender === 'female' }" @click="aPerson.gender = 'female'">여</button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-input-weight">
                        <span class="input-label">관계 :</span>
                        <button type="button" :class="{ 'relation-btn': true, 'selected': relationship === 'son' }" @click="selectRelationship('son')">아들</button>
                        <button type="button" :class="{ 'relation-btn': true, 'selected': relationship === 'daughter' }" @click="selectRelationship('daughter')">딸</button>
                        <button type="button" :class="{ 'relation-btn': true, 'selected': relationship === 'spouse' }" @click="selectRelationship('spouse')">배우자</button>
                        <select v-model="relationship" class="input-box1" :disabled="relationship === 'son' || relationship === 'daughter' || relationship === 'spouse'">
                            <option value="" disabled selected>기타</option>
                            <option value="father">아버지</option>
                            <option value="mother">어머니</option>
                            <option value="father_in_law">시아버지</option>
                            <option value="mother_in_law">시어머니</option>
                            <option value="brother">형제</option>
                            <option value="younger_brother">남동생</option>
                            <option value="sister">자매</option>
                            <option value="younger_sister">여동생</option>
                            <option value="friend">친구</option>
                            <option value="grandfather">할아버지</option>
                            <option value="grandmother">할머니</option>
                            <option value="grandson">손자</option>
                            <option value="granddaughter">손녀</option>
                            <option value="uncle">삼촌</option>
                            <option value="aunt">이모</option>
                            <option value="nephew">조카(남)</option>
                            <option value="niece">조카(여)</option>
                            <option value="cousin">사촌</option>
                            <option value="relative">친척</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-input-weight">
                        <span class="input-label">생년월일 :</span>
                        <div class="date-input">
                            <input type="number" v-model="birthYear" min="0" max="99" class="input-box2" @change="updateBirthYear">
                            <span class="date-separator">-</span>
                            <input type="number" v-model="birthMonth" min="1" max="12" class="input-box2" @change="updateBirthMonth">
                            <span class="date-separator">-</span>
                            <input type="number" v-model="birthDay" :min="1" :max="getMaxDay(birthMonth)" class="input-box2" @change="updateBirthDay">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-input-weight">
                        <span class="input-label">전화번호 :</span>
                        <div class="input-box-max">
                            <span class="phone-separator">010 -</span>
                            <input type="text" maxlength="4" v-model="phone1" class="phone-input" placeholder="0000" />
                            <span class="phone-separator">-</span>
                            <input type="text" maxlength="4" v-model="phone2" class="phone-input" placeholder="0000" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-input-weight">
                        <span class="input-label">테그 :</span>
                        <div class="tag-input">
                            <input type="text" v-model="newTagInput" class="input-box1" placeholder="태그를 입력하세요" @keyup.enter="addTag" />
                            <button type="button" class="add-tag-btn" @click="addTag">+</button>
                        </div>
                        <div class="tag-list">
                            <span v-for="(tag, index) in aPerson.tags" :key="index" class="tag">{{ tag }} <button type="button" class="remove-tag-btn" @click="removeTag(index)">x</button></span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="add-btn">추가</button>
                    <button type="button" class="cancel-btn" @click="closeModal">취소</button>
                </div>
            </form>
        </div>
    </div>
    <div class="signup-page">
        <h2>회원가입</h2>
        <p>전화번호가 곧 아이디 입니다</p>
        <form @submit.prevent="signUpSubmit">
            <div class="form-group">
            <div class="form-input-weight">
                <span class="input-label">이름 :</span>
                <input type="text" id="name" v-model="aPerson.name" class="input-box1" required>
                <button type="button" :class="{ 'gender-btn': true, 'selected': aPerson.gender === 'male' }" @click="aPerson.gender = 'male'">남</button>
                <button type="button" :class="{ 'gender-btn': true, 'selected': aPerson.gender === 'female' }" @click="aPerson.gender = 'female'">여</button>
            </div>
            </div>
            <div class="form-group">
            <div class="form-input-weight">
                <span class="input-label">생년월일 :</span>
                <div class="date-input">
                <input type="number" v-model="birthYear" min="0" max="99" class="input-box2" @change="updateBirthYear">
                <span class="date-separator">-</span>
                <input type="number" v-model="birthMonth" min="1" max="12" class="input-box2" @change="updateBirthMonth">
                <span class="date-separator">-</span>
                <input type="number" v-model="birthDay" :min="1" :max="getMaxDay()" class="input-box2" @change="updateBirthDay">
                </div>
            </div>
            </div>
            <div class="form-group">
                <div class="form-input-weight">
                    <span class="input-label">전화번호 :</span>
                    <div class="input-box-max">
                        <span class="phone-separator">010 -</span>
                        <input type="text" maxlength="4" v-model="phone1" class="phone-input" placeholder="0000" required />
                        <span class="phone-separator">-</span>
                        <input type="text" maxlength="4" v-model="phone2" class="phone-input" placeholder="0000" required />
                    </div>
                </div>
                <div class="password-group">
                    <div class="form-input-weight">
                        <span class="input-label">비밀번호 :</span>
                        <input type="password" id="password" v-model="password" class="input-box" placeholder="비밀번호를 입력하세요" required>
                    </div>
                    <div>
                        <span v-if="passwordMismatch" class="password-mismatch">비밀번호가 일치하지 않습니다.</span>
                    </div>
                    <div class="form-input-weight">
                        <span class="input-label">비밀번호 확인 :</span>
                        <input type="password" id="confirmPassword" v-model="confirmPassword" class="input-box" placeholder="비밀번호를 다시 입력하세요" @input="checkPasswordMatch">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-input-weight">
                    <span class="input-label">주소 :</span>
                    <input type="text" id="aPerson.address" v-model="address" class="input-box">
                </div>
            </div>
            <div class="form-group">
            <div class="form-input-weight">
                <span class="input-label">가족 :</span>
                <button type="button" class="add-family-btn" @click="addFamilyMember">+</button>
            </div>
            <div v-if="signUpDto.familyMembers.length > 0" class="family-summary">
                <!-- 가족 요약 정보 표시 -->
                <ul>
                <li v-for="(member, index) in signUpDto.familyMembers" :key="index">
                    {{ member.aPerson.name }} - {{ member.relationship }}
                </li>
                </ul>
            </div>
            </div>
            <button type="submit" class="login-btn">확인</button>
        </form>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                aPerson: {
                    name: '',
                    gender: '',
                    date_of_birth: '',
                    phone_number: '',
                    address: '',
                    tags: [],
                },
                backUpPerson: '',
                relationship: '',
                password: '',
                confirmPassword: '',
                passwordMismatch: false,

                birthYear: 90,
                birthMonth: 6,
                birthDay: 15,
        
                phone1: '',
                phone2: '',

                showModal: false,
                newTagInput: '',

                signUpDto: {
                    aPerson: '',
                    password: '',
                    familyMembers: [],
                },
            };
        },
        methods: {
            checkRequiredFields(fields) {
                const missingFields = [];
                if (!this.aPerson.name) { missingFields.push('이름'); }
                if (!this.aPerson.gender) { missingFields.push('성별'); }
                if (this.phone1.length<3 || this.phone2<4 ) { missingFields.push('전화번호'); }
                if (!this.confirmPassword ) { missingFields.push('비밀번호'); }
                if (fields && fields.length > 0) { fields.forEach(field => { if (!this[field]) { missingFields.push(field); }}); }
                if (missingFields.length > 0) {
                    const fieldNames = missingFields.join(', ');
                    alert(`${fieldNames}를(을) 입력해주세요.`);
                    return true;
                }
                return false;
            },

            async signUpSubmit() {
                if (this.checkRequiredFields()) { return; } // 내용 체크

                const currentYear = new Date().getFullYear() % 100;
                let fullYear = this.birthYear <= currentYear ? this.birthYear + 2000 : this.birthYear + 1900;
                this.aPerson.date_of_birth = `${fullYear}-${this.birthMonth}-${this.birthDay}`;
                this.aPerson.phone_number = `${this.phone1}${this.phone2}`;

                this.signUpDto.aPerson = {...this.aPerson};
                this.signUpDto.password = this.password;

                //for (const member of this.signUpDto.familyMembers) {}
                        
                try {
                    await this.$axios.post('/signup', this.signUpDto);
                        alert('회원가입이 완료되었습니다.');
                        // 회원가입 완료 후 처리 로직 추가
                } catch (error) {
                    console.error(error);
                    alert('회원가입에 실패했습니다.');
                }
            },

            addFamilyMember() {
                if (!this.aPerson.gender) {
                    alert('본인의 성별을 먼저 선택해주세요.');
                    return;
                }
                this.backupPerson();
                this.resetaPerson();
                this.showModal = true;
            },

            familySubmit() {
                if (this.checkRequiredFields()) { return; } // 내용 체크

                const currentYear = new Date().getFullYear() % 100;
                let fullYear = this.birthYear <= currentYear ? this.birthYear + 2000 : this.birthYear + 1900;
                this.aPerson.date_of_birth = `${fullYear}-${this.birthMonth}-${this.birthDay}`;
                this.aPerson.phone_number = `${this.phone1}${this.phone2}`;

                let relationship;
                if (this.relationship === 'son') {
                    relationship = 'son';
                } else if (this.relationship === 'daughter') {
                    relationship = 'daughter';
                } else if (this.relationship === 'spouse') {
                    relationship = this.aPerson.gender === 'male' ? 'husband' : 'wife';
                } else {
                    relationship = this.relationship;
                }
                this.signUpDto.familyMembers.push( this.aPerson, {relationship});
            },
 
            updatePassword(event) {
                this.password = event.target.value;
            },

            checkPasswordMatch() {
                this.passwordMismatch = this.password !== this.confirmPassword && this.confirmPassword !== '' && this.password.length <= this.confirmPassword.length;
            },

            updateBirthInfo(member, field, value) {
                switch (field) {
                case 'year':
                    member.birthYear = value;
                    this.handleYearChange(member);
                    break;
                case 'month':
                    member.birthMonth = value;
                    this.handleMonthChange(member);
                    break;
                case 'day':
                    member.birthDay = value;
                    this.handleDayChange(member);
                    break;
                }
            },

            handleYearChange(member) {
                if (member.birthYear > 99) { 
                    member.birthYear = 0;
                } else if (member.birthYear < 0) { 
                    member.birthYear = 99; 
                }
            },

            handleMonthChange(member) {
                if (member.birthMonth > 12) {
                    member.birthMonth = 1;
                    member.birthYear++;
                } else if (member.birthMonth < 1) {
                    member.birthMonth = 12;
                    member.birthYear--;
                }
                this.handleDayChange(member);
            },

            handleDayChange(member) {
                const maxDay = this.getMaxDay(member.birthMonth);
                if (member.birthDay > maxDay) {
                    member.birthDay = 1;
                    member.birthMonth++;
                } else if (member.birthDay < 1) {
                    member.birthDay = this.getMaxDay(member.birthMonth - 1);
                    member.birthMonth--;
                }
            },
            getMaxDay(month) {
                const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                return maxDays[month - 1];
            },
        
            selectRelationship(relation) {
                this.relationship = relation;
                if (relation === 'son') { 
                    this.aPerson.gender = 'male';
                } else if (relation === 'daughter') {
                    this.aPerson.gender = 'female';
                } else if (relation === 'spouse') {
                    this.aPerson.gender = this.backUpPerson.gender === 'male' ? 'female' : 'male';
                }
            },
            
            closeModal() {
                this.resetaPerson();
                this.restorePerson();
                this.showModal = false;
            },

            resetaPerson() {
                this.aPerson = {
                    name: '',
                    gender: '',
                    date_of_birth: '',
                    phone_number: '',
                    address: '',
                    tags: [],
                };
                this.birthYear = 90;
                this.birthMonth = 6;
                this.birthDay = 15;

                this.phone1 = '';
                this.phone2 = '';

                this.newTagInput = '';
            },

            backupPerson() {
                this.backUpPerson = {
                    ...this.aPerson, 
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    birthYear: this.birthYear,
                    birthMonth: this.birthMonth,
                    birthDay: this.birthDay,
                    phone1: this.phone1,
                    phone2: this.phone2,
                };
            },

            restorePerson() {
                this.aPerson = this.backUpPerson;

                this.password = this.backUpPerson.password;
                this.confirmPassword = this.backUpPerson.confirmPassword;

                this.birthYear = this.backUpPerson.birthYear;
                this.birthMonth = this.backUpPerson.birthMonth;
                this.birthDay = this.backUpPerson.birthDay;

                this.phone1 = this.backUpPerson.phone1;
                this.phone2 = this.backUpPerson.phone2;
            },

            addTag() {
                if (this.newTagInput.trim() !== '') {
                const tag = this.newTagInput.trim().startsWith('#') ? this.newTagInput.trim() : `#${this.newTagInput.trim().replace(/ /g, '_')}`;
                this.aPerson.tags.push(tag);
                this.newTagInput = '';
                }
            },

            removeTag(index) {
                this.aPerson.tags.splice(index, 1);
            },
        },
    };
</script>
  
<style scoped>
    .signup-page {
        max-width: 300px;
        margin: 0 auto;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5px;
    }

    .form-input-weight {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .input-label {
        display: flex;
        justify-content: center;
        width: 80px;
        margin-right: 6px;
    }

    .input-box1 {
        display: flex;
        justify-content: center;
        width: 100px;
        align-items: center;
        margin-right: 7px;
    }

    .input-box2 {
        display: flex;
        justify-content: center;
        width: 50px;
        align-items: center;
        text-align: center;
    }

    .phone-separator {
        margin-left: 5px;
        margin-right: 5px;
    }

    input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 15px;
    }

    .phone-input {
        width: 50px;
        text-align: center;
    }

    .input-box-max {
        display: flex;
        justify-content: center;
        width: 220px;
        align-items: center;
    }

    .input-box {
        display: flex;
        justify-content: center;
        width: 220px;
        align-items: center;
    }

    .password-group {
        display: flex;
        flex-direction: column;
        /* 초기 높이 설정 */
        min-height: 100px; 
    }

    .password-mismatch {
        color: red;
        font-size: 12px;
        margin-left: 10px;
        display: block; /* 이 줄 추가 */
    }

    .invalid {
        color: red;
    }

    .gender-btn {
        padding: 5px 10px;
        margin-right: 5px;
        background-color: #f0f0f0;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .gender-btn.selected {
        background-color: #4CAF50;
        color: white;
    }

    .date-input {
        display: flex;
        align-items: center;
    }

    .date-input input {
        width: 40px;
        text-align: center;
    }

    .date-separator {
        margin-left: 5px;
        margin-right: 5px;
    }

    .add-family-btn {
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .family-summary {
        margin-top: 10px;
    }

    .login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .family-member-modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 350px;
    }

    .tag {
        display: inline-block;
        background-color: #f0f0f0;
        padding: 5px 10px;
        border-radius: 3px;
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .remove-tag-btn {
        margin-left: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .tag-input {
        display: flex;
        align-items: center;
    }

    .add-tag-btn {
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .add-btn {
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .cancel-btn {
        padding: 5px 10px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
</style>