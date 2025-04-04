import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addThuChi, deleteThuChi, searchThuChi, statisticsThuChi, updateThuChi } from '../redux/reducers/QLTCReducer';
import ModalComponent from '../ModalCustom/ModalComponent';

const QLTCScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateThuChi, setDateThuChi] = useState('');
  const [catThuChi, setCatThuChi] = useState('');
  const [amountMoney, setAmountMoney] = useState('');

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [amountError, setAmountError] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');


  // const listThuChi = useSelector(state => state.listThuChi.listThuChi);
  const listThuChi = useSelector(state => state.listThuChi.filteredThuChi || state.listThuChi.listThuChi);
  const statistics = useSelector(state => state.listThuChi.statistics);
  const dispatch = useDispatch();

  const handleAdd = () => {
    let error = false;

    if (title.length === 0) {
      setTitleError('Please enter title');
      error = true;
    } else {
      setTitleError('');
    }
    if (description.length === 0) {
      setDescriptionError('Please enter description');
      error = true;
    } else {
      setDescriptionError('');
    }

    if (dateThuChi.length === 0) {
      setDateError('Please enter date');
      error = true;
    } else {
      setDateError('');
    }

    if (catThuChi.length === 0) {
      setCategoryError('Please enter Category');
      error = true;
    } else if(catThuChi!=='Thu' && catThuChi!=='Chi'){
      setCategoryError('You just can enter Thu or Chi');
      error = true;
    }else {
      setCategoryError('');
    }

    if (amountMoney.length === 0) {
      setAmountError('Please enter amount money!');
      error = true;
    } else {
      setAmountError('');
    }

    if (!error) {
      let newThuChi = {
        id: Math.random().toString(),
        title: title,
        description: description,
        dateThuChi: dateThuChi,
        catThuChi: catThuChi,
        amountMoney: amountMoney
      };
      dispatch(addThuChi(newThuChi));
      setTitle('');
      setDescription('');
      setDateThuChi('');
      setCatThuChi('');
      setAmountMoney('');
      setShowAddModal(false);
    }

  }

  const handleDelete = (id) => {
    dispatch(deleteThuChi(id));
    setShowDelModal(false);
  }
  const handleupdate = () => {
    let udThuChi = {
      id: selectedId,
      title: title,
      description: description,
      dateThuChi: dateThuChi,
      catThuChi: catThuChi,
      amountMoney: amountMoney
    };
    dispatch(updateThuChi(udThuChi));
    setTitle('');
    setDescription('');
    setDateThuChi('');
    setCatThuChi('');
    setAmountMoney('');
    setShowUpdateModal(false);
  }

  const handleSearch = () => {
    dispatch(searchThuChi(searchKeyword));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchThuChi(searchKeyword));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeyword]);

  useEffect(() => {
    dispatch(statisticsThuChi());
  }, [listThuChi]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', paddingRight: 20, borderWidth: 1, borderRadius: 10, alignSelf: 'center', marginVertical: 20, }}>
        <TextInput
          placeholder='search your item here...'
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={{ flex: 1, }}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{ borderLeftWidth: 1, borderRightWidth: 1 }}>
          <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listThuChi}
        style={{ marginBottom: 124 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={{ margin: 10, borderBottomWidth: 2, paddingBottom: 10 }}>
            <View style={{ margin: 20 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >{item.title}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{item.description}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{item.dateThuChi}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{item.catThuChi}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{item.amountMoney}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id);
                  setTitle(item.title);
                  setDescription(item.description);
                  setDateThuChi(item.dateThuChi);
                  setCatThuChi(item.catThuChi);
                  setAmountMoney(item.amountMoney);
                  setShowUpdateModal(true);
                }}
                style={{ flex: 1, backgroundColor: 'lightblue', marginHorizontal: 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowDelModal(true);
                  setSelectedId(item.id)
                }}
                style={{ flex: 1, backgroundColor: 'red', marginHorizontal: 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        }
      />

      {/* **** */}
      <ModalComponent
        modalTitle="Add New One"
        onClosePress={() => {
          setShowAddModal(false)
          setTitle('');
          setDescription('');
          setDateThuChi('');
          setCatThuChi('');
          setAmountMoney('');

          setTitleError('');
          setDescriptionError('');
          setDateError('');
          setCategoryError('');
          setAmountError('');
        }}
        onSavePress={handleAdd}
        animationType='fade'
        transparent={true}
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(!showAddModal)}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={dateThuChi}
            onChangeText={setDateThuChi}
          />
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={catThuChi}
            onChangeText={setCatThuChi}
          />
          {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amountMoney}
            onChangeText={setAmountMoney}
          />
          {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
        </View>
      </ModalComponent>
      {/* *** */}
      {/* *** */}
      <ModalComponent
        modalTitle="Delete Item"
        onClosePress={() => setShowDelModal(false)}
        onSavePress={() => handleDelete(selectedId)}
        animationType='fade'
        transparent={true}
        visible={showDelModal}
        onRequestClose={() => setShowDelModal(!showDelModal)}>
        <Text style={{ alignSelf: 'center', marginVertical: 20, fontSize: 20, fontWeight: 'bold' }}>Are your sure to delete this item?</Text>
      </ModalComponent>
      {/* *** */}
      {/* *** */}
      <ModalComponent
        modalTitle="Update Item"
        onClosePress={() => {
          setShowUpdateModal(false)
          setTitle('');
          setDescription('');
          setDateThuChi('');
          setCatThuChi('');
          setAmountMoney('');
        }}
        onSavePress={handleupdate}
        animationType='fade'
        transparent={true}
        visible={showUpdateModal}
        onRequestClose={() => setShowUpdateModal(!showUpdateModal)}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={dateThuChi}
            onChangeText={setDateThuChi}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={catThuChi}
            onChangeText={setCatThuChi}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amountMoney}
            onChangeText={setAmountMoney}
          />
        </View>
      </ModalComponent>
      {/* *** */}


      <View style={{ backgroundColor: 'lightgreen', width: 100, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', bottom: 80, right: 10 }}>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Text style={{ fontWeight: 'bold' }}>Add new one</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'lightblue',
          width: '100%',
          height: 60,
          alignSelf: 'center',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: 'absolute',
          bottom: 0,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tổng Thu: {statistics.totalThu}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tổng Chi: {statistics.totalChi}</Text>
      </View>

    </View >
  )
}

export default QLTCScreen

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
})